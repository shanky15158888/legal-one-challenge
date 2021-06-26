import React from 'react'
import Table from '../Table/Table'
import agents from '../json-data/agents.json'
import logs from '../json-data/logs.json'
import moment from 'moment'

export default function Homepage(props) {
    const cols = ["Phone number", "Number of calls", "Last call details"]
    const tableData = [];
    const formatBasedOnNumber = getFormatBasedOnNumber();
    for(let key in formatBasedOnNumber) {
        const sortedRecord = sortRecordBasedOnDate(formatBasedOnNumber[key]);
        const obj = {}
        obj['data'] = []
        obj.data.push({'url': `/call/${sortedRecord[0].number}`, 'type': 'link', 'data': sortedRecord[0].number})                
        obj.data.push({'url': '', 'data': `${sortedRecord.length} ${sortedRecord.length > 1? "calls": "call"}`})                
        obj.data.push({'url': `/agent/${sortedRecord[0].agentIdentifier}`, 'type': 'link', 'data': `${sortedRecord[0].name}/${getTime(sortedRecord[0].dateTime)}`})                
        tableData.push(obj)
    }
    return (
        <>
            <header>
                <h2>Homepage</h2>
            </header>
            <Table cols={cols} rows={tableData} />
        </>
    )
}

const sortRecordBasedOnDate = (arr) => {
    const list = [...arr]
    list.sort((a, b) => {
        return Date.parse(b.dateTime) - Date.parse(a.dateTime)
    })
    return list;
}

const getTime = (date) => {
    return moment(date).format('HH:MM');
}

const getFormatBasedOnNumber = () => {
    let formatBasedOnNumber = {};
    logs.forEach((log) => {
        const agentIdentifier = formatBasedOnNumber[log.number];
        agents.forEach((agentDetail) => {
            if(agentDetail['identifier'] === log.agentIdentifier) {
                log['name'] = `${agentDetail['firstName']} ${agentDetail['lastName']}`;
            } 
        })
        if(agentIdentifier) {
            formatBasedOnNumber[log.number].push(log)
        } else {
            formatBasedOnNumber[log.number] = [log]

        }
    })
    return formatBasedOnNumber
}


