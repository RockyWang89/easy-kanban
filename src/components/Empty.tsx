import DraftsRoundedIcon from '@mui/icons-material/DraftsRounded';

//An empty display on the page without task under it
function Empty() {
    return (
        <div className="empty">
            <h1>No task here</h1>
            <br/>
            <DraftsRoundedIcon  sx={{fontSize: "13em"}}/>
        </div>
    );
}

export default Empty;