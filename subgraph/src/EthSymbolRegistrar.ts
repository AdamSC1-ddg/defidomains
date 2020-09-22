// Import types and APIs from graph-ts
import {
  ByteArray,
  crypto
} from '@graphprotocol/graph-ts'

import {
  createEventID, ROOT_NODE, EMPTY_ADDRESS,
  uint256ToByteArray, byteArrayFromHex, concat
} from './utils'

// Import event types from the registry contract ABI
import {
  NameMigrated as NameMigratedEvent,
  NameRegistered as NameRegisteredEvent,
  NameRenewed as NameRenewedEvent,
  Transfer as TransferEvent,
} from './types/EthSymbolBaseRegistrar/EthSymbolBaseRegistrar'

import {
  NameRegistered as ControllerNameRegisteredEvent
} from './types/EthSymbolRegistrarController/EthSymbolRegistrarController'

// Import entity types generated from the GraphQL schema
import { Account, AuctionedName, Domain, Registration, NameMigrated, NameRegistered, NameRenewed, NameTransferred } from './types/schema'

var rootNode: ByteArray = byteArrayFromHex("0x7047d26fdf90178a66ac8e737a53b83af50667ac98783ea4dc2afa7728d92d05")

export function handleNameMigrated(event: NameMigratedEvent): void {
  let label = uint256ToByteArray(event.params.id)

  let auctionedName = AuctionedName.load(label.toHex())

  let registration = new Registration(label.toHex())
  registration.domain = crypto.keccak256(concat(rootNode, label)).toHex();
  registration.registrationDate = auctionedName.registrationDate
  registration.expiryDate = event.params.expires
  registration.registrant = event.params.owner.toHex()
  registration.save()

  let registrationEvent = new NameMigrated(createEventID(event))
  registrationEvent.registration = registration.id
  registrationEvent.blockNumber = event.block.number.toI32()
  registrationEvent.transactionID = event.transaction.hash
  registrationEvent.registrant = event.params.owner.toHex()
  registrationEvent.expiryDate = event.params.expires
  registrationEvent.save()
}

export function handleNameRegistered(event: NameRegisteredEvent): void {
  let account = new Account(event.params.owner.toHex())
  account.save()

  let label = uint256ToByteArray(event.params.id)
  let registration = new Registration(label.toHex())
  registration.domain = crypto.keccak256(concat(rootNode, label)).toHex()
  registration.registrationDate = event.block.timestamp
  registration.expiryDate = event.params.expires
  registration.registrant = account.id
  registration.save()

  let registrationEvent = new NameRegistered(createEventID(event))
  registrationEvent.registration = registration.id
  registrationEvent.blockNumber = event.block.number.toI32()
  registrationEvent.transactionID = event.transaction.hash
  registrationEvent.registrant = account.id
  registrationEvent.expiryDate = event.params.expires
  registrationEvent.save()
}

export function handleNameRegisteredByController(event: ControllerNameRegisteredEvent): void {
  let domain = new Domain(crypto.keccak256(concat(rootNode, event.params.label)).toHex())
  if (domain.labelName !== event.params.name) {
    let ownerId = event.params.owner.toHex()
    let owner = Account.load(ownerId)
    if (owner == null) {
      owner = new Account(ownerId)
      owner.save()
    }
    domain.isMigrated = false
    domain.owner = owner.id
    domain.labelName = event.params.name
    domain.name = event.params.name + '.Ξ'
    domain.save()
  }
}

export function handleNameRenewed(event: NameRenewedEvent): void {
  let label = uint256ToByteArray(event.params.id)
  let registration = new Registration(label.toHex())
  registration.expiryDate = event.params.expires
  registration.save()

  let registrationEvent = new NameRenewed(createEventID(event))
  registrationEvent.registration = registration.id
  registrationEvent.blockNumber = event.block.number.toI32()
  registrationEvent.transactionID = event.transaction.hash
  registrationEvent.expiryDate = event.params.expires
  registrationEvent.save()
}

export function handleNameTransferred(event: TransferEvent): void {
  let label = uint256ToByteArray(event.params.tokenId)
  let registrant = event.params.to.toHex()
  let registration = Registration.load(label.toHex())
  if (registration == null) return;

  registration.registrant = registrant
  registration.save()

  let transferEvent = new NameTransferred(createEventID(event))
  transferEvent.registration = label.toHex()
  transferEvent.blockNumber = event.block.number.toI32()
  transferEvent.transactionID = event.transaction.hash
  transferEvent.newOwner = registrant
  transferEvent.save()
}