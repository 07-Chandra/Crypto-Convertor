import React from "react";

import { useEffect, useState } from "react";
import {Card, Form, Input, Select } from "antd";
import './Crypto.css'

function Crypto() {
    const url = "https://api.coingecko.com/api/v3/exchange_rates";
    const [cryptoList, setCryptoList] = useState([]);
    const defaultFirstSelectValue = "Bitcoin";
    const defaultSecondSelectValue = "Ether";
    const [firstSelect, setFirstSelect] = useState(defaultFirstSelectValue);
    const [secondSelect, setSecondSelect] = useState(defaultSecondSelectValue);
    const [inputValue, setInputValue] = useState("0");
    const [result, setResult] = useState("0");
    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (cryptoList.length == 0) return;

        const firstSelectRate = cryptoList.find((item) => {
            return item.value === firstSelect;
        }).rate;

        const secondSelectRate = cryptoList.find((item) => {
            return item.value === secondSelect;
        }).rate;

        const resultValue = (inputValue * secondSelectRate) / firstSelectRate;

        setResult(resultValue.toFixed(6));
    }, [inputValue, firstSelect, secondSelect]);

    async function fetchData() {
        const response = await fetch(url);
        const jsonData = await response.json();

        const data = jsonData.rates;

        console.log(data);

        const ArrayData = Object.entries(data).map((item) => {
            return {
                value: item[1].name,
                label: item[1].name,
                rate: item[1].value,
            };
        });

        setCryptoList(ArrayData);
    }
    return (
        <div className="container">
            <Card className="crypto-card" title={<h1>Crypto Convertor</h1>}>
                <Form>
                    <Form.Item style={{ textAlign: "center" }}>
                        <Input
                            style={{
                                width: "400px",
                                padding: "10px",
                                fontSize: "25px",
                            }}
                            onChange={(event) =>
                                setInputValue(event.target.value)
                            }
                        />
                    </Form.Item>
                </Form>
                <div className="select-box">
                    <Select
                        className="select"
                        defaultValue={defaultFirstSelectValue}
                        style={{ width: "300px", padding: "10px" }}
                        options={cryptoList}
                        onChange={(value) => setFirstSelect(value)}
                    ></Select>
                    <Select
                        defaultValue={defaultSecondSelectValue}
                        style={{ width: "300px", padding: "10px" }}
                        options={cryptoList}
                        onChange={(value) => setSecondSelect(value)}
                    ></Select>
                </div>
                <p className="output">
                    {inputValue} {firstSelect} = {result} {secondSelect}
                </p>
            </Card>
        </div>
    );
}

export default Crypto;
