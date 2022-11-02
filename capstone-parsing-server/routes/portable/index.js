// routes/user.js
const express = require("express");
const axios = require("axios");
const fs = require("fs");

const router = express.Router();

router.get("/", (req, res) => {
  console.log(req.query);
  const serachCompany = req.query.company;

  const itemListBuffer = fs.readFileSync("portableData.json");
  const itemList = JSON.parse(itemListBuffer.toString());
  const searchItem = itemList.filter((item) => item.isinCdNm === serachCompany);

  res.send(searchItem);
});

router.get("/save", (req, res) => {
  const uri =
    "http://apis.data.go.kr/1160100/service/GetStocDiviInfoService/getDiviInfo?serviceKey=LxT%2B%2BKVSdbvMJ5%2FPf9MPc3poMWk5E62s7tCmFnGkbHUwPidtHpQvdcP3rt5ST4C9h01d4K5GJDmeQlKaSQhO3g%3D%3D";
  const params = {
    numOfRows: 59977,
    pageNo: 1,
    resultType: "json",
  };

  axios.get(uri, { params }).then((res) => {
    const itemList = res.data.response.body.items.item;
    console.log(itemList);

    const itemListJson = JSON.stringify(itemList);

    fs.writeFileSync("portableData.json", itemListJson);
  });

  res.send("Hello, Portable");
});

module.exports = router;
