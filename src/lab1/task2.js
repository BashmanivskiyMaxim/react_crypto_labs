import React from 'react';
import {Table} from "react-bootstrap";

const Task2 = () => {
    return (
        <Table bordered>
            <tbody>
            <tr>
                <td><b>First Name</b></td>
                <td>John</td>
            </tr>
            <tr>
                <td><b>Last Name</b></td>
                <td>Silver</td>
            </tr>
            <tr>
                <td><b>Occupation</b></td>
                <td>Pirate Captain</td>
            </tr>
            </tbody>
        </Table>
    );

}
export default Task2;