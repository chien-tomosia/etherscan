const express = require('express');
const router = express.Router();
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/25c7c08910c04b0c9be79c09f559652e'))

router.get('/:pageId', async function (req, res) {
    let pageId = req.params.pageId;
    let addrCheck = await web3.utils.isAddress(pageId)
    if (addrCheck !== true) {
        return res.render('error')
    }
    web3.eth.getBalance(pageId, function (err, wei) {
        if (err) {
            return res.redirect(`/error`)
        }
        let bal = web3.utils.fromWei(wei, 'ether');
        return res.render('address', { address: pageId, bal })
    })
})

module.exports = router;