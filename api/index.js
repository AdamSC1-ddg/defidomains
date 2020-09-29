const express = require("express");
const axios = require("axios");
const { toHex } = require("web3-utils");

app = express(),
port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })


app.get('/:base_registrar/:token_id', function (req, res) {
    const tokenId = req.params.token_id
    const contract = req.params.base_registrar

    const registrarNodeMap = {

        "0x523F38571f463c86acDa20F6E73794844e8EC00c": "0xe23c1845b96c0c4b37fbb545b38cff2fe0449edb1df7e34390454e19d697616b", // .defi 
        "0xe9571C98F0DD8D82C4b3ac44Ba57eBa9861bC4a4": "0xaeb80943d7970b602b395cbc8c7f1a6d98738aee6d23e7689d14efe266704067", // .dapp 
        "0x3161e5618337B318362c39f3c7E670Ca23706C97": "0x4a577841665418d2941072f21b5602cad2daa590c5dc581a2f3cbc7ee3d8ec2d", // .dex 
        "0x4f95132591A283c38CCA5583338f6cF3BC0713eb": "0xfd6497833c540841e1a74eda3f9b15bc0db664bb7e20dce7b7f950a182376b95", // .yield 
        "0xdCaeb079f635BfA9524496759128A6F625939B35": "0xb5f2bbf81da581299d4ff7af60560c0ac854196f5227328d2d0c2bb0df33e553", // .dao 
        "0x663027AA3dBf942e6093B7FEcC367E693F678858": "0xb75cf4f3d8bc3deb317ed5216d898899d5cc6a783f65f6768eb9bcb89428670d", // .nft 
        "0x4968e298FDfefaf6155eF8D34c231FC0cE49Bd4b": "0x572e8cce9cadb272410b9b1a01685fdb2609411afed0c7f12324c7bb1bd5c911", // .sol 
        "0x06d30d22589dfd49B3b12E1CD94634570F1852b2": "0x63cebbf94831c06713075eaa6cb223ad20b4cedd4f9f4f04b74bc96e46f45bf7", // .yfi 
        "0x6B94fAb1B0427Cd06953E7140A850E474e6800A2": "0x7047d26fdf90178a66ac8e737a53b83af50667ac98783ea4dc2afa7728d92d05", // .Ξ 
        "0xEc3076c972Ee38a4480a0c66a332B579d1AeD340": "0x941c511454ca6e932ee7abc2f6de71e7d77ac8d7e7508b1818aaf2bc1239b7f7", // .🦄 
        "0x4e506cA4d4F64B65c9396C000e5C7388ADA74EA8": "0x95cbc45d28e77f91841f3063a47763998fcd93fbeaa5f6496c5ab1a0770a8a23", // .🐻 
        "0xB146FB9F3aeb9D1b0de358356936cAd2ee8a0d4e": "0x1c7cd4f51bbe5439a11a37b62dd5129fcbaa98982ad7796fa6fcf94485e8e387", // .🐮 
        "0xc583835bd79C6C6683eC2ECdCaC026211BBe2163": "0x8e67a0821bc622b5feda2f338759d6be667630df57b0c72766a94b14550921ee", // .⟠
        "0x0994bcA1EFEa54256d215D46B2B47D047E712D82": "0x956c1ec74b03071bf0d1cc37111b273fea8891f21e35345e71f43fccf8763059", // .degen
        "0x608d058EF21cC690505F0c6E3D37616132DEE0Fc": "0xa8cc19925a31111e8a604910189c05e309cc36c4afa43c89adfe4b1e0c578560", // .💸
        "0x92d0Ee21931698c289E777170F00BAF653eCd260": "0x1aa70d46eeb7155d5ee0db6dc9d9945ac21ad38d3ecdf172278385440ddad1d7", // .🍍
        "0x0461daFC4BaB6946547264d5fa067f2D637A4D37": "0x1e3f482b3363eb4710dae2cb2183128e272eafbe137f686851c1caea32502230", // .🍠
        "0xd9893D6Eb6293F73764bCE5502eCa4E26B6BE00e": "0xd79acfbabd164a46ad85b37c5da0630b543543374e09428834210691e10cb020", // .🍣
        "0x908EfB76CA41ED2Ef9115529409478Bf779DC1F1": "0x1e3f482b3363eb4710dae2cb2183128e272eafbe137f686851c1caea32502230", // .wallet
                
    }

    const rootNode = registrarNodeMap[contract]

    axios.post("http://127.0.0.1:8000/subgraphs/name/testnet/defi-ens", {       
        query: `
        {
            domains(where: {tokenID: "${tokenId}"}) {
              id
              name
              labelName
              parent {
                id
              }
            }
          }               
            `
    })
        .then(data => {
            let json = (data.data.data.domains || [])
                .filter(r => r.parent.id == rootNode)
                .map(r => {
                    return {
                        "description": r.labelName,
                        "external_url": "",
                        "image": "",
                        "name": r.name,
                        "attributes": [],
                    }
                })
            return res.status(200).send(json)
        })
        .catch(err => {
            console.log(err)
            return res.send(err)
        });
        
});

