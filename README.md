# Ethire

## Initiate Hardhat

```shell
npm init --yes
npm install --save-dev hardhat
npx hardhat init
```

## Install dependencies

```shell
npm install dotenv --save
```

- Enter your API HTTPS and Private Keys in `.env`

## Install Ethers.js

```shell
npm install --save-dev @nomiclabs/hardhat-ethers "ethers@^5.0.0"
```

## Compile smart contract

```shell
npx hardhat compile
```

## Deploy smart contract

https://docs.alchemy.com/docs/how-to-deploy-a-smart-contract-to-the-sepolia-testnet

```shell
npx hardhat run deployments/deploy.js --network sepolia
```

## Initiate client app

```shell
npx create-next-app client
TypeScript Yes
ESLint Yes
Tailwind CSS Yes
src/ Yes
App Router Yes
import alias No
```

## Install dependencies

```shell
yarn add dotenv
yarn add react-icons
yarn add @thirdweb-dev/react @thirdweb-dev/sdk ethers@^5
yarn add pino-pretty
npm install mongodb
npm install mongoose @types/mongoose
npm install prisma typescript ts-node @types/node
npm install @prisma/client--save-dev
yarn add web3
yarn add date-fns
yarn add thirdweb
yarn add jspdf
npm install axios
npm i --save-dev @ethersproject/providers
yarn add chart.js
yarn add react-chartjs-2
npm install nodemailer
```

## Initialize Prisma

```shell
npx prisma init
```

## Run client

```shell
yarn build
yarn start
yarn dev
```

### Contract address

`0xD7139A06E7ECF7a87781371762BAab8C3Fbb44F3`
`0x74BfF6ec5F346684EF9188bCE7Ddd9c74839D662`
