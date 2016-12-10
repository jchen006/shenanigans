/*Current Entry React Components */
ReactDOM.render(
    <DataBaseEntries dataBaseListUrl="/db/getMainEntries" pollInterval={3 * 60 * 1000} />,
    document.getElementById('content')
);