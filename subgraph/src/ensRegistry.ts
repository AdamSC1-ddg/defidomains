// Import types and APIs from graph-ts
import {
  crypto,
  ens
} from '@graphprotocol/graph-ts'

import {
  getTokenIdFromHash, createEventID, concat, ROOT_NODE, EMPTY_ADDRESS
} from './utils'

// Import event types from the registry contract ABI
import {
  NewOwner as NewOwnerEvent,
  Transfer as TransferEvent,
  NewResolver as NewResolverEvent,
  NewTTL as NewTTLEvent
} from './types/ENSRegistry/EnsRegistry'

// Import entity types generated from the GraphQL schema
import { Account, Domain, Resolver, NewOwner, Transfer, NewResolver, NewTTL } from './types/schema'

function createDomain(node: string): Domain {
  let domain = new Domain(node)
  if(node == ROOT_NODE) {
    domain = new Domain(node)

    let owner = Account.load(EMPTY_ADDRESS)
    if (owner == null) {
      owner = new Account(EMPTY_ADDRESS)
      owner.save()
    }

    domain.owner = EMPTY_ADDRESS
    domain.isMigrated = true
  }
  return domain
}

function getDomain(node: string): Domain|null {
  let domain = Domain.load(node)
  if(domain == null && node == ROOT_NODE) {
    return createDomain(node)
  }
  return domain
}

// Handler for NewOwner events
function _handleNewOwner(event: NewOwnerEvent, isMigrated: boolean): void {
  let account = new Account(event.params.owner.toHexString())
  account.save()

  let subnode = crypto.keccak256(concat(event.params.node, event.params.label)).toHexString()
  let domain = getDomain(subnode);
  if(domain == null) {
    domain = new Domain(subnode)
  }

  if(domain.name == null) {

    let map:Map<string,string> = new Map()

    map.set("0x93cdeb708b7545dc668eb9280176169d1c33cfd8ed6f04690a0bcc88a93fc4ae", "eth")       
    map.set("0x8e67a0821bc622b5feda2f338759d6be667630df57b0c72766a94b14550921ee", "⟠")       
    map.set("0x1aa70d46eeb7155d5ee0db6dc9d9945ac21ad38d3ecdf172278385440ddad1d7", "🍍")       
    map.set("0x830dff0616dd02034d343649e89778764721c34b46ac7d6456dfcca21d911715", "🍠")       
    map.set("0xd79acfbabd164a46ad85b37c5da0630b543543374e09428834210691e10cb020", "🍣")       
    map.set("0x1c7cd4f51bbe5439a11a37b62dd5129fcbaa98982ad7796fa6fcf94485e8e387", "🐮")       
    map.set("0x95cbc45d28e77f91841f3063a47763998fcd93fbeaa5f6496c5ab1a0770a8a23", "🐻")       
    map.set("0x941c511454ca6e932ee7abc2f6de71e7d77ac8d7e7508b1818aaf2bc1239b7f7", "🦄")       
    map.set("0xb5f2bbf81da581299d4ff7af60560c0ac854196f5227328d2d0c2bb0df33e553", "dao")       
    map.set("0xaeb80943d7970b602b395cbc8c7f1a6d98738aee6d23e7689d14efe266704067", "dapp")       
    map.set("0x956c1ec74b03071bf0d1cc37111b273fea8891f21e35345e71f43fccf8763059", "degen")       
    map.set("0x4a577841665418d2941072f21b5602cad2daa590c5dc581a2f3cbc7ee3d8ec2d", "dex")       
    map.set("0xb75cf4f3d8bc3deb317ed5216d898899d5cc6a783f65f6768eb9bcb89428670d", "nft")       
    map.set("0x572e8cce9cadb272410b9b1a01685fdb2609411afed0c7f12324c7bb1bd5c911", "sol")       
    map.set("0x1e3f482b3363eb4710dae2cb2183128e272eafbe137f686851c1caea32502230", "wallet")       
    map.set("0x63cebbf94831c06713075eaa6cb223ad20b4cedd4f9f4f04b74bc96e46f45bf7", "yfi")       
    map.set("0xfd6497833c540841e1a74eda3f9b15bc0db664bb7e20dce7b7f950a182376b95", "yield")       
    map.set("0x7047d26fdf90178a66ac8e737a53b83af50667ac98783ea4dc2afa7728d92d05", "Ξ")       
    map.set("0xa8cc19925a31111e8a604910189c05e309cc36c4afa43c89adfe4b1e0c578560", "💸")       
    map.set("0xe23c1845b96c0c4b37fbb545b38cff2fe0449edb1df7e34390454e19d697616b", "defi")       
 

    // Get label and node names
    let label = ens.nameByHash(event.params.label.toHexString())
    if (label != null) {
      domain.labelName = label
      
    } else if (map.has(subnode)) {
        label = map.get(subnode) as string || null
        domain.labelName = label
    }

    if(label == null) {
      label = '[' + event.params.label.toHexString().slice(2) + ']'
    }
    if(event.params.node.toHexString() == '0x0000000000000000000000000000000000000000000000000000000000000000') {
      domain.name = label
    } else {
      let parent = Domain.load(event.params.node.toHexString())
      domain.name = label + '.' + parent.name
    }
  }

  domain.owner = account.id
  domain.parent = event.params.node.toHexString()
  domain.labelhash = event.params.label
  let tokenId = getTokenIdFromHash(event.params.label).toString()
  domain.tokenID = tokenId  
  domain.isMigrated = isMigrated
  domain.save()

  let domainEvent = new NewOwner(createEventID(event))
  domainEvent.blockNumber = event.block.number.toI32()
  domainEvent.transactionID = event.transaction.hash
  domainEvent.domain = domain.id
  domainEvent.owner = account.id
  domainEvent.save()
}

// Handler for Transfer events
export function handleTransfer(event: TransferEvent): void {
  let node = event.params.node.toHexString()

  let account = new Account(event.params.owner.toHexString())
  account.save()

  // Update the domain owner
  let domain = getDomain(node);
  domain.owner = account.id
  domain.save()

  let domainEvent = new Transfer(createEventID(event))
  domainEvent.blockNumber = event.block.number.toI32()
  domainEvent.transactionID = event.transaction.hash
  domainEvent.domain = node
  domainEvent.owner = account.id
  domainEvent.save()
}

// Handler for NewResolver events
export function handleNewResolver(event: NewResolverEvent): void {
  let id = event.params.resolver.toHexString().concat('-').concat(event.params.node.toHexString())

  let node = event.params.node.toHexString()
  let domain = getDomain(node)
  domain.resolver = id

  let resolver = Resolver.load(id)
  if(resolver == null) {
    resolver = new Resolver(id)
    resolver.domain = event.params.node.toHexString()
    resolver.address = event.params.resolver
    resolver.save()
  } else {
    domain.resolvedAddress = resolver.addr
  }

  domain.save()

  let domainEvent = new NewResolver(createEventID(event))
  domainEvent.blockNumber = event.block.number.toI32()
  domainEvent.transactionID = event.transaction.hash
  domainEvent.domain = node
  domainEvent.resolver = id
  domainEvent.save()
}

// Handler for NewTTL events
export function handleNewTTL(event: NewTTLEvent): void {
  let node = event.params.node.toHexString()
  let domain = getDomain(node)
  domain.ttl = event.params.ttl
  domain.save()

  let domainEvent = new NewTTL(createEventID(event))
  domainEvent.blockNumber = event.block.number.toI32()
  domainEvent.transactionID = event.transaction.hash
  domainEvent.domain = node
  domainEvent.ttl = event.params.ttl
  domainEvent.save()
}

export function handleNewOwner(event: NewOwnerEvent): void {
  _handleNewOwner(event, true)
}

export function handleNewOwnerOldRegistry(event: NewOwnerEvent): void {
  let subnode = crypto.keccak256(concat(event.params.node, event.params.label)).toHexString()
  let domain = getDomain(subnode)

  if(domain == null || domain.isMigrated == false){
    _handleNewOwner(event, false)
  }
}

export function handleNewResolverOldRegistry(event: NewResolverEvent): void {
  let node = event.params.node.toHexString()
  let domain = getDomain(node)

  if(node == ROOT_NODE || domain.isMigrated == false){
    handleNewResolver(event)
  }
}
export function handleNewTTLOldRegistry(event: NewTTLEvent): void {
  let domain = getDomain(event.params.node.toHexString())

  if(domain.isMigrated == false){
    handleNewTTL(event)
  }
}

export function handleTransferOldRegistry(event: TransferEvent): void {
  let domain = getDomain(event.params.node.toHexString())

  if(domain.isMigrated == false){
    handleTransfer(event)
  }
}
