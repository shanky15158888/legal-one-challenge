import React from 'react'
import Table from '../Table/Table';
import logs from '../json-data/logs.json'
import resolution from '../json-data/resolution.json'
import moment from 'moment';
import { Link } from 'react-router-dom';

export default function Agentlog(props) {
    const id = props.match && props.match.params && props.match.params.id ? props.match.params.id : ""
    const cols = ["Phone number", "Call date and time", "Resolution"]
    const tableData = [];

    const agentRecords = logs.filter((log) => {
        return log.agentIdentifier === id
    })

    const resolutionRecord = getResolution(agentRecords)

    resolutionRecord.forEach((item) => {
        const obj = {}
        obj['data'] = []
        obj.data.push({ 'data': item.number, type: "link", url: `/call/${item.number}` })
        obj.data.push({ 'data': getDateTimeFormat(item.dateTime) })
        obj.data.push({ 'data': item.resolution })
        tableData.push(obj)
    })

    return (
        <>
            <header><h2>Agent Logs</h2></header>
            <Link className="goRight" to="/">Home</Link>
            <Table cols={cols} rows={tableData} />
        </>
    )
}

const getResolution = (list) => {
    const arr = JSON.parse(JSON.stringify(list));
    const temp_arr = [];
    arr.forEach((item) => {
        resolution.forEach((subItem) => {
            if (item.identifier === subItem.identifier) {
                item['resolution'] = subItem.resolution
                temp_arr.push(item)
            }
        })
    })
    return temp_arr
}

const getDateTimeFormat = (date) => {
    return moment(date).format('DD/M/YYYY HH:MM:SS');
}