import Table from "react-bootstrap/Table";
import "./styles.css";
import React, { useState } from "react";
import Euclid_gcd from "./gcd";
import { Button } from "semantic-ui-react";
/* global BigInt */

export default function Task1() {
  const [cipher, setCipher] = useState("0");
  const [decipher, setDeCipher] = useState("0");

  function generateEncryptionExponent(phi) {
    let e = 31n; //31

    while (Euclid_gcd(e, phi)[0] !== 1n) {
      e += 2n;
    }

    console.log("e - " + e);
    return e;
  }

  function computeDecryptionExponent(e, phi) {
    let d = Euclid_gcd(e, phi)[1];

    console.log(Euclid_gcd(e, phi));

    while (d < 1n) {
      d += phi;
    }

    console.log("d exponent - " + d);

    return d;
  }

  function encrypt(m, publicKey) {
    const { e, n } = publicKey;

    console.log("публічний ключ -" + e);
    console.log("публічний ключ -" + n);
    console.log("інф -" + m);

    if (m < 0 || m >= n) {
      throw new Error(`Condition 0 <= m < n not met. m = ${m}`);
    }
    const c = m ** e % n;

    return c;
  }

  function decrypt(c, secretKey) {
    const { d, n } = secretKey;
    console.log("секретний ключ -" + d);

    const m = c ** d % n;

    return m;
  }

  function rsaExample() {
    const p = 29n; //29
    const q = 37n; //37
    const n = p * q; // 1073n
    const phi = (p - 1n) * (q - 1n); //1008n

    const e = generateEncryptionExponent(phi);
    const d = computeDecryptionExponent(e, phi);

    const publicKey = { e, n };
    const secretKey = { d, n };

    const m = 13n;
    const c = encrypt(m, publicKey);
    const m2 = decrypt(c, secretKey);

    setCipher(c.toString());
    setDeCipher(m2.toString());
  }


  return (
    <div>
      <Table striped bordered hover variant="dark">
        <tbody>
          <thead>
            <tr>
              <th width={"10%"}>RSA - шифрування</th>
            </tr>
          </thead>
          <tr>
            <td>p</td>
            <td>29</td>
          </tr>
          <tr>
            <td>q</td>
            <td>37</td>
          </tr>
          <tr>
            <td>e</td>
            <td>31</td>
          </tr>
          <tr>
            <td>Інформація</td>
            <td>13</td>
          </tr>
          <tr>
            <td>Зашифрування:</td>
            <td>{cipher}</td>
          </tr>
          <tr>
            <td>Розшифрування:</td>
            <td>{decipher}</td>
          </tr>
        </tbody>
      </Table>
      <Button variant="primary" onClick={() => rsaExample()}>
        Порахувати
      </Button>
    </div>
  );
}
