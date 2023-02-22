import { SyntheticEvent, useState } from "react";
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { LinkTabPropsI } from "../modules/modules";

function LinkTab(props: LinkTabPropsI) {
    return <Tab component="a" {...props} />
}

function Navbar() {
    const [value, setValue] = useState(()=>{
        let initValue;
        switch(window.location.href.split('/')[5]) {
            case 'todo': 
                initValue = 0;
                break;
            case 'doing':
                initValue = 1;
                break;
            case 'done': 
                initValue = 2;
                break;
            case 'archived':
                initValue = 3;
                break;
            default:
                initValue = 0;
        }
        return initValue;
    });

    const handleChange = (event: SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <div className="navbar">
            <Box sx={{ width: '100%' }}>
                <Tabs value={value} onChange={handleChange} centered>
                    <LinkTab label="TO DO" href="/#/kanban/todo" />
                    <LinkTab label="DOING" href="/#/kanban/doing" />
                    <LinkTab label="DONE" href="/#/kanban/done" />
                    <LinkTab label="ARCHIVED" href="/#/kanban/archived" />
                </Tabs>
            </Box>
        </div>
    )
}

export default Navbar;