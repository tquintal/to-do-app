import { useContext } from 'react';
import StorageContext from '../../../context/storage-context';
import classes from './Actions.module.css';
import { CSVLink } from 'react-csv';

function Actions() {
    const context = useContext(StorageContext);

    const onImportHandler = event => {
        const csvToArray = (str, delimiter = ',') => {
            const headers = str.slice(0, str.indexOf('\n')).split(delimiter);

            if (headers.join('') !== 'idcontentcreatedcategoryhighPrioritycompleted') {
                alert('⚠️ Error, wrong format file.');
                return 'error';
            };

            const rows = str.slice(str.indexOf('\n') + 1).split('\n');

            const arr = rows.map(row => {
                const values = row.split(delimiter);
                const el = headers.reduce((object, header, index) => {
                    if (values[index] === 'true')
                        object[header] = true
                    else if (values[index] === 'false')
                        object[header] = false
                    else
                        object[header] = values[index];

                    return object;
                }, {});
                return el;
            });

            return arr;
        };

        if (event.target.files[0]) {
            const reader = new FileReader();
            reader.readAsText(event.target.files[0]);
            reader.onload = e => {
                let text = e.target.result.replace(/"/g, '');
                const convert = csvToArray(text);
                if (convert !== 'error')
                    context.onLoadToDos(csvToArray(text));
            };
        };
    };

    function onResetHandler() {
        context.onDeleteAll();
        window.location.reload();
    };

    return <div className={classes['actions-container']}>
        <div className={classes['import-container']}>
            <label htmlFor='upload'>Import:</label>
            <input id='upload' type='file' accept='.csv' style={{ width: '100%' }} onChange={onImportHandler} />
        </div>
        <CSVLink data={context.toDos}>Export</CSVLink>
        <button type='button' onClick={onResetHandler}>Reset</button>
    </div>;
};

export default Actions;
