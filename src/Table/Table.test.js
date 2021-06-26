import React from 'react';
import renderer from 'react-test-renderer';
import Table from './Table';
import { BrowserRouter as Router } from "react-router-dom";

test('Table component testing', () => {
    const cols = ["Phone number", "Number of calls", "Last call details"]
    const rows = [
        { data: [
            {data: "+49151484522"},
            {data: "05/10/2020 20:10:00"},
            {data: "need reschedule"}
        ]}
    ]
    const component = renderer.create(
        <Router>
            <Table cols={cols} rows={rows}/>
        </Router>,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});