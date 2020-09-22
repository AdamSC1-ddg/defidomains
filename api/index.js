const express = require("express");
const axios = require("axios");

app = express(),
port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })

app.get('/:domainId', (req, res) => {
    axios.post("http://127.0.0.1:8000/subgraphs/name/testnet/defi-ens", {       
    query: `
    {
        domains(where:{name:"${req.params.domainId}"}) { 
            id
            name
            labelName  
        }}
    `
    })
    .then(data => {        
        let json = (data.data.data.domains || []).map(d => {
           return  {
            "description": d.labelName, 
            "external_url": "", 
            "image": "", 
            "name": d.name,
            "attributes": [ ], 
          }
        }) 
         return res.status(200).send(json)})
    .catch(err => { 
        console.log(err)
        return res.send(err)});
});

app.get("/", (req, res, next) => {

    axios.post("http://127.0.0.1:8000/subgraphs/name/testnet/defi-ens", {       
    query: `
    {
        domains(first:1000) { 
            id
            name
            labelName
        }
    }
    `
    })
    .then(data => {        
        let json = (data.data.data.domains || []).map(d => {
           return  {
            "description": d.labelName, 
            "external_url": "", 
            "image": "", 
            "name": d.name,
            "attributes": [ ], 
          }
        }) 
         return res.status(200).send(json)})
    .catch(err => { 
        console.log(err)
        return res.send(err)});
})


