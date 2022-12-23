const { ethers} = require('ethers')
const c = require("colors")


const rpcURL = 'https://cloudflare-eth.com/'
const provider = new ethers.providers.JsonRpcProvider(rpcURL)


provider.on("block", async (blockNum) => {

    const blockData = await provider.getBlockWithTransactions(blockNum)

    const transactionArray = blockData.transactions

    for (let i = 0; i < transactionArray.length; i++) {
        if(ethers.utils.formatEther(transactionArray[i].value) > 1){
        const currentTxnValue = ethers.utils.formatEther(transactionArray[i].value)
        const currentTxnHash = transactionArray[i].hash
        const currentTxnSender = transactionArray[i].from
        console.log(`Hash: ${c.green(currentTxnHash)} \n Value: ${c.blue(currentTxnValue)} \n Sender: ${c.underline.italic.gray(currentTxnSender)}`)
        console.log(`You can Check on : ${c.green(`https://etherscan.io/tx/${currentTxnHash}`)} `)
    }
    }

})

