import React from "react";

const TableComponent = ({ arraysession, changeisclickedit }) => (

  <table>
    <thead>
      <tr>
        <th>idsession</th>
        <th>name</th>
        <th>year</th>
        <th>datestart</th>
        <th>dateend</th>
        <th>isactive</th>
        <th>editer</th>
      </tr>
    </thead>
    <tbody>
      {
        arraysession.map((value, cle) =>
          <tr key={cle}>

            <td >{value.idsession} </td>
            <td >{value.namesession}</td>
            <td >{value.yearsession}</td>
            <td >{value.datestartsession}</td>
            <td >{value.dateendsession}</td>
            <td >{value.isactive}</td>
            <td><button onClick={changeisclickedit} >cc</button></td>

          </tr>
        )
      }
    </tbody>
  </table >


);

export default TableComponent;
