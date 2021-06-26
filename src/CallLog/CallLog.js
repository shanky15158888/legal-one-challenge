import React from 'react'
import Table from '../Table/Table';
import logs from '../json-data/logs.json'
import resolution from '../json-data/resolution.json'
import agents from '../json-data/agents.json'
import moment from 'moment';
import { Link } from 'react-router-dom';

export default function CallLog(props) {
    const number = props.match && props.match.params && props.match.params.number ? props.match.params.number : "";
    const cols = ["Agent Name", "Call date and time", "Resolution"]
    const tableData = [];

    const recordsCalledAtNumber = logs.filter((log) => {
        return log.number === number
    })

    const agentNames = getAgentNames(recordsCalledAtNumber)

    const resolutions = getResolution(agentNames);

    resolutions.forEach((item) => {
        const obj = {}
        obj['data'] = []
        obj.data.push({ 'data': item.name })
        obj.data.push({ 'data': getDateTimeFormat(item.dateTime) })
        obj.data.push({ 'data': item.resolution })
        tableData.push(obj)
    })

    return (
        <>
            <header><h2>Call Logs</h2></header>
            <Link className="goRight" to="/">Home</Link>
            <Table cols={cols} rows={tableData} />
        </>
    )
}

const getAgentNames = (recordsCalledAtNumber) => {
    const arr = JSON.parse(JSON.stringify(recordsCalledAtNumber));
    const temp_arr = [];
    arr.forEach((item) => {
        agents.forEach((subItem) => {
            if (item.agentIdentifier === subItem.identifier) {
                item['name'] = `${subItem.firstName} ${subItem.lastName}`
                temp_arr.push(item)
            }
        })
    })
    return temp_arr
}

const getResolution = (agentNameList) => {
    const arr = JSON.parse(JSON.stringify(agentNameList));
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
