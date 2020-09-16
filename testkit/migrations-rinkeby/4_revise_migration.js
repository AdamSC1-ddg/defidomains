const ENSRegistry = artifacts.require("ENSRegistry");
const DefiBaseRegistrar = artifacts.require("BaseRegistrarImplementation");
const DappBaseRegistrar = artifacts.require("BaseRegistrarImplementation");
const DexBaseRegistrar = artifacts.require("BaseRegistrarImplementation");
const YieldBaseRegistrar = artifacts.require("BaseRegistrarImplementation");
const DaoBaseRegistrar = artifacts.require("BaseRegistrarImplementation");
const NftBaseRegistrar = artifacts.require("BaseRegistrarImplementation");
const SolBaseRegistrar = artifacts.require("BaseRegistrarImplementation");
const YfiBaseRegistrar = artifacts.require("BaseRegistrarImplementation");
const bBaseRegistrar = artifacts.require("BaseRegistrarImplementation");
const ΞBaseRegistrar = artifacts.require("BaseRegistrarImplementation");
const UniBaseRegistrar = artifacts.require("BaseRegistrarImplementation");
const BearBaseRegistrar = artifacts.require("BaseRegistrarImplementation");
const BullBaseRegistrar = artifacts.require("BaseRegistrarImplementation");
const EBaseRegistrar = artifacts.require("BaseRegistrarImplementation");
const DegenBaseRegistrar = artifacts.require("BaseRegistrarImplementation");
const WalletBaseRegistrar = artifacts.require("BaseRegistrarImplementation");
const SushiBaseRegistrar = artifacts.require("BaseRegistrarImplementation");
const YamBaseRegistrar = artifacts.require("BaseRegistrarImplementation");
const PineappleBaseRegistrar = artifacts.require("BaseRegistrarImplementation");
//const sleep = m => new Promise(r => setTimeout(r, m))

const PriceOracle = artifacts.require("StablePriceOracle");


const DefiRegistrarController = artifacts.require("ETHRegistrarController");
const DappRegistrarController = artifacts.require("ETHRegistrarController");
const DexRegistrarController = artifacts.require("ETHRegistrarController");
const YieldRegistrarController = artifacts.require("ETHRegistrarController");
const DaoRegistrarController = artifacts.require("ETHRegistrarController");
const NftRegistrarController = artifacts.require("ETHRegistrarController");
const SolRegistrarController = artifacts.require("ETHRegistrarController");
const YfiRegistrarController = artifacts.require("ETHRegistrarController");
const bRegistrarController = artifacts.require("ETHRegistrarController");
const ΞRegistrarController = artifacts.require("ETHRegistrarController");
const UniRegistrarController = artifacts.require("ETHRegistrarController");
const BearRegistrarController = artifacts.require("ETHRegistrarController");
const BullRegistrarController = artifacts.require("ETHRegistrarController");
const ERegistrarController = artifacts.require("ETHRegistrarController");
const YamRegistrarController = artifacts.require("ETHRegistrarController");
const SushiRegistrarController = artifacts.require("ETHRegistrarController");
const WalletRegistrarController = artifacts.require("ETHRegistrarController");
const DegenRegistrarController = artifacts.require("ETHRegistrarController");
const PineappleRegistrarController = artifacts.require("ETHRegistrarController");


const PublicResolver = artifacts.require("PublicResolver")
const ReverseRegistrar = artifacts.require("ReverseRegistrar");

const namehash = require("eth-ens-namehash");
const sha3 = require("web3-utils").sha3;
const toBN = require("web3-utils").toBN;

const DAYS = 24 * 60 * 60;
const SALT = sha3("foo");
const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
const NIL_ADDRESS = "0x0000000000000000000000000000000000000000000000000000000000000000"
//0x2cc116761f592ca63b5701189b06827a6d04037c4b7593ff66671455ed5779d2
const DEFI_SHA = sha3("defi");
const DEFI_HASH = namehash.hash("defi");
const DAPP_SHA = sha3("dapp");
const DAPP_HASH = namehash.hash("dapp");
const DEX_SHA = sha3("dex");
const DEX_HASH = namehash.hash("dex");
const WALLET_SHA = sha3("wallet");
const WALLET_HASH = namehash.hash("wallet");
const YIELD_SHA = sha3("yield");
const YIELD_HASH = namehash.hash("yield");
const DAO_SHA = sha3("dao");
const DAO_HASH = namehash.hash("dao");
const NFT_SHA = sha3("nft");
const NFT_HASH = namehash.hash("nft");
const SOL_SHA = sha3("sol");
const SOL_HASH = namehash.hash("sol");
const YFI_SHA = sha3("yfi");
const YFI_HASH = namehash.hash("yfi");
//const b_SHA = sha3("xn--4zg");
//const b_HASH = namehash.hash("xn--4zg");
const Ξ_SHA = sha3("Ξ".normalize());
const Ξ_HASH = namehash.hash("Ξ".normalize());
const Uni_SHA = sha3("🦄");
const Uni_HASH = namehash.hash("🦄");
const Bear_SHA = sha3("🐻");
const Bear_HASH = namehash.hash("🐻");
const Bull_SHA = sha3("🐮");
const Bull_HASH = namehash.hash("🐮");
const E_SHA = sha3("⟠".normalize());
const E_HASH = namehash.hash("⟠".normalize());
const Money_SHA = sha3("💸");
const Money_HASH = namehash.hash("💸");
const Wallet_SHA = sha3("wallet");
const Wallet_HASH = namehash.hash("wallet");
const Degen_SHA = sha3("degen");
const Degen_HASH = namehash.hash("degen");
const Pineapple_SHA = sha3("🍍");
const Pineapple_HASH = namehash.hash("🍍");
const Sushi_SHA = sha3("🍣");
const Sushi_HASH = namehash.hash("🍣");
const Yam_SHA = sha3("🍠");
const Yam_HASH = namehash.hash("🍠");
const 錢包_SHA = sha3("錢包");
const 錢包_HASH = namehash.hash("錢包");
const MIN_COMMITMENT_AGE = 60;
const MAX_COMMITMENT_AGE = 86400;
const reversesha = sha3("reverse");
const addrsha = sha3("addr");
const usdprices = "0x8A753747A1Fa494EC906cE90E9f37563A8AF630e"; //rinkeby
const pricearray = [31688730000000,23766550000000,15844360000000,7922180000000,3168870000000,570397293000];

// eploy the old ENS contracts with some sample names.
module.exports = async function (deployer, network, accounts) {

  // Deploy the ENSregistry
  //await deployer.deploy(ENSRegistry, {from: accounts[0]});
  const ens = await ENSRegistry.at('0xc9067a27c2Df142b03fb7Fa135a7729E31Fd74d0');

  // Create the original 'permanent' registrar and register some names on it
  //await deployer.deploy(DefiBaseRegistrar, ens.address, DEFI_HASH, { from: accounts[0] });
  //Registrar = await DefiBaseRegistrar.deployed();
  //await Registrar.addController(accounts[0], { from: accounts[0] });
  
  // // Deploy the price oracle
  //await deployer.deploy(PriceOracle,usdprices,pricearray,{ from: accounts[0] })
  const pOracle = await PriceOracle.at('0x6298C46c2ba558504bBF1dc1C2d5af42817960Fe');

  // // Deploy the controller
  //await deployer.deploy(DefiRegistrarController,Registrar.address,pOracle.address,MIN_COMMITMENT_AGE,MAX_COMMITMENT_AGE,{ from: accounts[0] })
  //const Controller = await DefiRegistrarController.deployed();

  // Deploy the Resolver
  //await deployer.deploy(PublicResolver,ENSRegistry.address,{ from: accounts[0] })
  const Resolver = await PublicResolver.at('0x6AC4e9fF024cf6bc4eef5F283354D7246C7b6288');

  //await Registrar.addController(Controller.address, {from: accounts[0]});
  //await ens.setSubnodeRecord(ZERO_ADDRESS, DEFI_SHA, Registrar.address, Resolver.address, 0, { from: accounts[0] });
  //await Registrar.register(sha3('resolver'), accounts[0], 31536000, {from: accounts[0] });
  //await ens.setSubnodeRecord(ZERO_ADDRESS, DEFI_SHA, accounts[0], Resolver.address, 0, { from: accounts[0] });
  //await ens.setSubnodeRecord(ZERO_ADDRESS, DEFI_HASH, accounts[0], Resolver.address, 0, { from: accounts[0] });
 //await ens.setResolver(namehash.hash('resolver.defi'), Resolver.address, {from: accounts[0]});
  //await ens.setResolver(namehash.hash('defi'), Resolver.address, {from: accounts[0]});
  //await ens.setResolver(ZERO_ADDRESS, Resolver.address, {from: accounts[0]});
 // await ens.setResolver(NIL_ADDRESS, Resolver.address, {from: accounts[0]});
  //await Registrar.addController(Controller.address, {from: accounts[0]});
  //await Resolver.methods['setAddr(bytes32,address)'],(namehash.hash('defi'), Registrar.address);
  //await Resolver.methods['setAddr(bytes32,address)'],(sha3('defi'), Registrar.address);
  //await Resolver.methods['setInterface(bytes32,bytes4,address'],(DEFI_HASH, 0x6ccb2df4, Registrar.address);
  //await Resolver.methods['setInterface(bytes32,bytes4,address'],(DEFI_HASH, 0x80ac58cd, Registrar.address);
  //await Resolver.methods['setInterface(bytes32,bytes4,address'],(DEFI_HASH, 0x018fac06, Controller.address);
 // await pOracle.addController(Registrar.address, {from: accounts[0]});
 // await pOracle.addController(Controller.address, {from: accounts[0]});
 //await ens.setSubnodeRecord(ZERO_ADDRESS, sha3('defi'), Registrar.address, Resolver.address, 0, {from: accounts[0]});
 // await ens.setSubnodeOwner(ZERO_ADDRESS, DEFI_SHA, Registrar.address, { from: accounts[0] });
 //await sleep(120);
   
  
  //await sleep(120);
  
  //.yfi
  //await deployer.deploy(YfiBaseRegistrar, ens.address, YFI_HASH, { from: accounts[0] });
  //YfiRegistrar = await YfiBaseRegistrar.deployed();
  //await YfiRegistrar.addController(accounts[0], { from: accounts[0] });
  //await deployer.deploy(YfiRegistrarController,YfiRegistrar.address,pOracle.address,MIN_COMMITMENT_AGE,MAX_COMMITMENT_AGE,{ from: accounts[0] })
  //const YfiController = await YfiRegistrarController.deployed();
  //await YfiRegistrar.addController(YfiController.address, {from: accounts[0]});
  //await ens.setSubnodeRecord(ZERO_ADDRESS, YFI_SHA, accounts[0], Resolver.address, 0, { from: accounts[0] });
  //await Resolver.methods['setAddr(bytes32,address)'],(namehash.hash('yfi'), YfiRegistrar.address);
  //await pOracle.addController(YfiRegistrar.address, {from: accounts[0]});
 // await pOracle.addController(YfiController.address, {from: accounts[0]});
  //await Resolver.methods['setAddr(bytes32,address)'],(sha3('yfi'), YfiRegistrar.address);
  //await Resolver.methods['setInterface(bytes32,bytes4,address'],(YFI_HASH, 0x6ccb2df4, SolRegistrar.address);
 // await Resolver.methods['setInterface(bytes32,bytes4,address'],(YFI_HASH, 0x80ac58cd, SolRegistrar.address);
  //await Resolver.methods['setInterface(bytes32,bytes4,address'],(YFI_HASH, 0x018fac06, SolController.address);
  //await ens.setSubnodeRecord(ZERO_ADDRESS, YFI_SHA, YfiRegistrar.address, Resolver.address, 0, { from: accounts[0] });
  //await sleep(30);
  //.₿
  //await deployer.deploy(bBaseRegistrar, ens.address, b_HASH, { from: accounts[0] });
  //bRegistrar = await bBaseRegistrar.deployed();
  //await bRegistrar.addController(accounts[0], { from: accounts[0] });
  //await deployer.deploy(bRegistrarController,bRegistrar.address,pOracle.address,MIN_COMMITMENT_AGE,MAX_COMMITMENT_AGE,{ from: accounts[0] })
 // const bController = await bRegistrarController.deployed();
  //await bRegistrar.addController(bController.address, {from: accounts[0]});
  //await ens.setSubnodeRecord(ZERO_ADDRESS, b_SHA, accounts[0], Resolver.address, 0, { from: accounts[0] });
 // await Resolver.methods['setAddr(bytes32,address)'],(namehash.hash('xn--4zg'), bRegistrar.address);
  //await pOracle.addController(bRegistrar.address, {from: accounts[0]});
  //await pOracle.addController(bController.address, {from: accounts[0]});
  //await Resolver.methods['setAddr(bytes32,address)'],(sha3('xn--4zg'), bRegistrar.address);
  //await Resolver.methods['setInterface(bytes32,bytes4,address'],(b_HASH, 0x6ccb2df4, bRegistrar.address);
  //await Resolver.methods['setInterface(bytes32,bytes4,address'],(b_HASH, 0x80ac58cd, bRegistrar.address);
 // await Resolver.methods['setInterface(bytes32,bytes4,address'],(b_HASH, 0x018fac06, bController.address);
  //await ens.setSubnodeRecord(ZERO_ADDRESS, b_SHA, bRegistrar.address, Resolver.address, 0, { from: accounts[0] });
  //await sleep(120);
  
  //Degen
  await deployer.deploy(DegenBaseRegistrar, ens.address, Degen_HASH, { from: accounts[0] });
  DegenRegistrar = await DegenBaseRegistrar.deployed();
  await DegenRegistrar.addController(accounts[0], { from: accounts[0] });
  await deployer.deploy(DegenRegistrarController,DegenRegistrar.address,pOracle.address,MIN_COMMITMENT_AGE,MAX_COMMITMENT_AGE,{ from: accounts[0] })
  const DegenController = await DegenRegistrarController.deployed();
  await DegenRegistrar.addController(DegenController.address, {from: accounts[0]});
  await ens.setSubnodeRecord(ZERO_ADDRESS, Degen_SHA, accounts[0], Resolver.address, 0, { from: accounts[0] });
  await Resolver.methods['setAddr(bytes32,address)'],(namehash.hash('degen'), DegenRegistrar.address);
  await pOracle.addController(DegenRegistrar.address, {from: accounts[0]});
  await pOracle.addController(DegenController.address, {from: accounts[0]});
  await Resolver.methods['setAddr(bytes32,address)'],(sha3('degen'), DegenRegistrar.address);
  await Resolver.methods['setInterface(bytes32,bytes4,address'],(Degen_HASH, 0x6ccb2df4, DegenRegistrar.address);
  await Resolver.methods['setInterface(bytes32,bytes4,address'],(Degen_HASH, 0x80ac58cd, DegenRegistrar.address);
  await Resolver.methods['setInterface(bytes32,bytes4,address'],(Degen_HASH, 0x018fac06, DegenController.address);
  await ens.setSubnodeRecord(ZERO_ADDRESS, Degen_SHA, DegenRegistrar.address, Resolver.address, 0, { from: accounts[0] });
  
  //.Ξ
  await deployer.deploy(ΞBaseRegistrar, ens.address, Ξ_HASH, { from: accounts[0] });
  ΞRegistrar = await ΞBaseRegistrar.deployed();
  await ΞRegistrar.addController(accounts[0], { from: accounts[0] });
  await deployer.deploy(ΞRegistrarController,ΞRegistrar.address,pOracle.address,MIN_COMMITMENT_AGE,MAX_COMMITMENT_AGE,{ from: accounts[0] })
  const ΞController = await ΞRegistrarController.deployed();
  await ΞRegistrar.addController(ΞController.address, {from: accounts[0]});
  await ens.setSubnodeRecord(ZERO_ADDRESS, Ξ_SHA, accounts[0], Resolver.address, 0, { from: accounts[0] });
  await Resolver.methods['setAddr(bytes32,address)'],(namehash.hash('Ξ'.normalize()), ΞRegistrar.address);
  await pOracle.addController(ΞRegistrar.address, {from: accounts[0]});
  await pOracle.addController(ΞController.address, {from: accounts[0]});
  await Resolver.methods['setAddr(bytes32,address)'],(sha3('Ξ'.normalize()), ΞRegistrar.address);
  await Resolver.methods['setInterface(bytes32,bytes4,address'],(Ξ_HASH, 0x6ccb2df4, ΞRegistrar.address);
  await Resolver.methods['setInterface(bytes32,bytes4,address'],(Ξ_HASH, 0x80ac58cd, ΞRegistrar.address);
  await Resolver.methods['setInterface(bytes32,bytes4,address'],(Ξ_HASH, 0x018fac06, ΞController.address);
  await ens.setSubnodeRecord(ZERO_ADDRESS, Ξ_SHA, ΞRegistrar.address, Resolver.address, 0, { from: accounts[0] });
  
  //⟠ xn--9hi Eth Diamond
  await deployer.deploy(EBaseRegistrar, ens.address, E_HASH, { from: accounts[0] });
  ERegistrar = await EBaseRegistrar.deployed();
  await ERegistrar.addController(accounts[0], { from: accounts[0] });
  await deployer.deploy(ERegistrarController,ERegistrar.address,pOracle.address,MIN_COMMITMENT_AGE,MAX_COMMITMENT_AGE,{ from: accounts[0] })
  const EController = await ERegistrarController.deployed();
  await ERegistrar.addController(EController.address, {from: accounts[0]});
  await ens.setSubnodeRecord(ZERO_ADDRESS, E_SHA, accounts[0], Resolver.address, 0, { from: accounts[0] });
  await Resolver.methods['setAddr(bytes32,address)'],(namehash.hash('⟠'.normalize()), ERegistrar.address);
  await pOracle.addController(ERegistrar.address, {from: accounts[0]});
  await pOracle.addController(EController.address, {from: accounts[0]});
  await Resolver.methods['setAddr(bytes32,address)'],(sha3('⟠'.normalize()), ERegistrar.address);
  await Resolver.methods['setInterface(bytes32,bytes4,address'],(E_HASH, 0x6ccb2df4, ERegistrar.address);
  await Resolver.methods['setInterface(bytes32,bytes4,address'],(E_HASH, 0x80ac58cd, ERegistrar.address);
  await Resolver.methods['setInterface(bytes32,bytes4,address'],(E_HASH, 0x018fac06, EController.address);
  await ens.setSubnodeRecord(ZERO_ADDRESS, E_SHA, ERegistrar.address, Resolver.address, 0, { from: accounts[0] });
  
    //Flying Money
  await deployer.deploy(MoneyBaseRegistrar, ens.address, Money_HASH, { from: accounts[0] });
  MoneyRegistrar = await MoneyBaseRegistrar.deployed();
  await MoneyRegistrar.addController(accounts[0], { from: accounts[0] });
  await deployer.deploy(MoneyRegistrarController,MoneyRegistrar.address,pOracle.address,MIN_COMMITMENT_AGE,MAX_COMMITMENT_AGE,{ from: accounts[0] })
  const MoneyController = await MoneyRegistrarController.deployed();
  await MoneyRegistrar.addController(MoneyController.address, {from: accounts[0]});
  await ens.setSubnodeRecord(ZERO_ADDRESS, Money_SHA, accounts[0], Resolver.address, 0, { from: accounts[0] });
  await Resolver.methods['setAddr(bytes32,address)'],(namehash.hash('💸'), MoneyRegistrar.address);
  await pOracle.addController(MoneyRegistrar.address, {from: accounts[0]});
  await pOracle.addController(MoneyController.address, {from: accounts[0]});
  await Resolver.methods['setAddr(bytes32,address)'],(sha3('💸'), MoneyRegistrar.address);
  await Resolver.methods['setInterface(bytes32,bytes4,address'],(Money_HASH, 0x6ccb2df4, MoneyRegistrar.address);
  await Resolver.methods['setInterface(bytes32,bytes4,address'],(Money_HASH, 0x80ac58cd, MoneyRegistrar.address);
  await Resolver.methods['setInterface(bytes32,bytes4,address'],(Money_HASH, 0x018fac06, MoneyController.address);
  await ens.setSubnodeRecord(ZERO_ADDRESS, Money_SHA, MoneyRegistrar.address, Resolver.address, 0, { from: accounts[0] });
  
    //Pineapple🍍
  await deployer.deploy(PineappleBaseRegistrar, ens.address, Pineapple_HASH, { from: accounts[0] });
  PineappleRegistrar = await PineappleBaseRegistrar.deployed();
  await PineappleRegistrar.addController(accounts[0], { from: accounts[0] });
  await deployer.deploy(PineappleRegistrarController,PineappleRegistrar.address,pOracle.address,MIN_COMMITMENT_AGE,MAX_COMMITMENT_AGE,{ from: accounts[0] })
  const PineappleController = await PineappleRegistrarController.deployed();
  await PineappleRegistrar.addController(PineappleController.address, {from: accounts[0]});
  await ens.setSubnodeRecord(ZERO_ADDRESS, Pineapple_SHA, accounts[0], Resolver.address, 0, { from: accounts[0] });
  await Resolver.methods['setAddr(bytes32,address)'],(namehash.hash('🍍'), PineappleRegistrar.address);
  await pOracle.addController(PineappleRegistrar.address, {from: accounts[0]});
  await pOracle.addController(PineappleController.address, {from: accounts[0]});
  await Resolver.methods['setAddr(bytes32,address)'],(sha3('🍍'), PineappleRegistrar.address);
  await Resolver.methods['setInterface(bytes32,bytes4,address'],(Pineapple_HASH, 0x6ccb2df4, PineappleRegistrar.address);
  await Resolver.methods['setInterface(bytes32,bytes4,address'],(Pineapple_HASH, 0x80ac58cd, PineappleRegistrar.address);
  await Resolver.methods['setInterface(bytes32,bytes4,address'],(Pineapple_HASH, 0x018fac06, PineappleController.address);
  await ens.setSubnodeRecord(ZERO_ADDRESS, Pineapple_SHA, PineappleRegistrar.address, Resolver.address, 0, { from: accounts[0] });
  
   //Yam🍠
  await deployer.deploy(YamBaseRegistrar, ens.address, Yam_HASH, { from: accounts[0] });
  YamRegistrar = await YamBaseRegistrar.deployed();
  await YamRegistrar.addController(accounts[0], { from: accounts[0] });
  await deployer.deploy(YamRegistrarController,YamRegistrar.address,pOracle.address,MIN_COMMITMENT_AGE,MAX_COMMITMENT_AGE,{ from: accounts[0] })
  const YamController = await YamRegistrarController.deployed();
  await YamRegistrar.addController(YamController.address, {from: accounts[0]});
  await ens.setSubnodeRecord(ZERO_ADDRESS, Yam_SHA, accounts[0], Resolver.address, 0, { from: accounts[0] });
  await Resolver.methods['setAddr(bytes32,address)'],(namehash.hash('🍠'), YamRegistrar.address);
  await pOracle.addController(YamRegistrar.address, {from: accounts[0]});
  await pOracle.addController(YamController.address, {from: accounts[0]});
  await Resolver.methods['setAddr(bytes32,address)'],(sha3('🍠'), YamRegistrar.address);
  await Resolver.methods['setInterface(bytes32,bytes4,address'],(Yam_HASH, 0x6ccb2df4, YamRegistrar.address);
  await Resolver.methods['setInterface(bytes32,bytes4,address'],(Yam_HASH, 0x80ac58cd, YamRegistrar.address);
  await Resolver.methods['setInterface(bytes32,bytes4,address'],(Yam_HASH, 0x018fac06, YamController.address);
  await ens.setSubnodeRecord(ZERO_ADDRESS, Yam_SHA, YamRegistrar.address, Resolver.address, 0, { from: accounts[0] });
  
   //Sushi 🍣
  await deployer.deploy(SushiBaseRegistrar, ens.address, Sushi_HASH, { from: accounts[0] });
  SushiRegistrar = await SushiBaseRegistrar.deployed();
  await SushiRegistrar.addController(accounts[0], { from: accounts[0] });
  await deployer.deploy(SushiRegistrarController,SushiRegistrar.address,pOracle.address,MIN_COMMITMENT_AGE,MAX_COMMITMENT_AGE,{ from: accounts[0] })
  const SushiController = await SushiRegistrarController.deployed();
  await SushiRegistrar.addController(SushiController.address, {from: accounts[0]});
  await ens.setSubnodeRecord(ZERO_ADDRESS, Sushi_SHA, accounts[0], Resolver.address, 0, { from: accounts[0] });
  await Resolver.methods['setAddr(bytes32,address)'],(namehash.hash('🍣'), SushiRegistrar.address);
  await pOracle.addController(SushiRegistrar.address, {from: accounts[0]});
  await pOracle.addController(SushiController.address, {from: accounts[0]});
  await Resolver.methods['setAddr(bytes32,address)'],(sha3('🍣'), SushiRegistrar.address);
  await Resolver.methods['setInterface(bytes32,bytes4,address'],(Sushi_HASH, 0x6ccb2df4, SushiRegistrar.address);
  await Resolver.methods['setInterface(bytes32,bytes4,address'],(Sushi_HASH, 0x80ac58cd, SushiRegistrar.address);
  await Resolver.methods['setInterface(bytes32,bytes4,address'],(Sushi_HASH, 0x018fac06, SushiController.address);
  await ens.setSubnodeRecord(ZERO_ADDRESS, Sushi_SHA, SushiRegistrar.address, Resolver.address, 0, { from: accounts[0] });
  
   
  
   //Wallet
  await deployer.deploy(WalletBaseRegistrar, ens.address, Wallet_HASH, { from: accounts[0] });
  WalletRegistrar = await WalletBaseRegistrar.deployed();
  await WalletRegistrar.addController(accounts[0], { from: accounts[0] });
  await deployer.deploy(WalletRegistrarController,WalletRegistrar.address,pOracle.address,MIN_COMMITMENT_AGE,MAX_COMMITMENT_AGE,{ from: accounts[0] })
  const WalletController = await WalletRegistrarController.deployed();
  await WalletRegistrar.addController(WalletController.address, {from: accounts[0]});
  await ens.setSubnodeRecord(ZERO_ADDRESS, Wallet_SHA, accounts[0], Resolver.address, 0, { from: accounts[0] });
  await Resolver.methods['setAddr(bytes32,address)'],(namehash.hash('wallet'), WalletRegistrar.address);
  await pOracle.addController(DegenRegistrar.address, {from: accounts[0]});
  await pOracle.addController(DegenController.address, {from: accounts[0]});
  await Resolver.methods['setAddr(bytes32,address)'],(sha3('wallet'), WalletRegistrar.address);
  await Resolver.methods['setInterface(bytes32,bytes4,address'],(Wallet_HASH, 0x6ccb2df4, WalletRegistrar.address);
  await Resolver.methods['setInterface(bytes32,bytes4,address'],(Wallet_HASH, 0x80ac58cd, WalletRegistrar.address);
  await Resolver.methods['setInterface(bytes32,bytes4,address'],(Wallet_HASH, 0x018fac06, WalletController.address);
  await ens.setSubnodeRecord(ZERO_ADDRESS, Wallet_SHA, WalletRegistrar.address, Resolver.address, 0, { from: accounts[0] });
 
  const stableOracleAddr = "0xb8Fe389c0093FaE6460106EFeA873105F1Dd841b"
  const resolverAddr = "0xdC105bd144f433dC1c4db5e942DB6881491570B3";
  
  //await deployer.deploy(ReverseRegistrar, ens.address, Resolver.address, { from: accounts[0] });
  //const reverseReg = await ReverseRegistrar.deployed();
  //await ens.setSubnodeOwner("0x0000000000000000000000000000000000000000", reversesha, accounts[0]);
  //await ens.setSubnodeOwner(namehash.hash("reverse"), addrsha, reverseReg.address);
}