import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles, TableCell, TableSortLabel, Paper, Grid } from '@material-ui/core';
import { AutoSizer, Column, SortDirection, Table } from 'react-virtualized';
import { blueGrey, cyan, grey, pink, purple, yellow } from '@material-ui/core/colors';

// import { CSVLink, CSVDownload } from "react-csv";
import axios from 'axios';

const styles = theme => ({
    table: {
        fontFamily: theme.typography.fontFamily,
    },
    flexContainer: {
        display: 'flex',
        alignItems: 'center',
        boxSizing: 'border-box',
    },
    tableRow: {
        cursor: 'pointer',
    },
    tableRowHover: {
        '&:hover': {
            backgroundColor: yellow[200],
        },
    },
    tableCell: {
        flex: 1,
        'text-align': 'center',
        padding: '4px 24px 4px 24px',
        //margin: '4px 15px 4px 15px'
        
    },
    noClick: {
        cursor: 'initial',
    },
    rowHeight: {
        height: 'fit-content',
    },
    columnheader: {
        width: 'max-content',
        height: 'max-content'
    }



});

const nateStyles = {

    gridContainer: {
        marginTop: 30,
        marginRight: 20,
        padding: 40,
    },
    paper: {
        height: 800,
        marginRight: 30
    }
}

class MuiVirtualizedTable extends React.PureComponent {
    getRowClassName = ({ index }) => {
        const { classes, rowClassName, onRowClick } = this.props;

        return classNames(classes.tableRow, classes.flexContainer, rowClassName, {
            [classes.tableRowHover]: index !== -1 && onRowClick != null,
        });
    };

    cellRenderer = ({ cellData, columnIndex = null }) => {
        const { columns, classes, rowHeight, onRowClick } = this.props;
        return (
            <TableCell
                component="div"
                className={classNames(classes.tableCell, classes.flexContainer, {
                    [classes.noClick]: onRowClick == null,
                })}
                variant="body"
                style={{ height: rowHeight }}
                align={(columnIndex != null && columns[columnIndex].numeric) || false ? 'right' : 'left'}
            >
                {cellData}
            </TableCell>
        );
    };

    headerRenderer = ({ label, columnIndex, dataKey, sortBy, sortDirection }) => {
        const { headerHeight, columns, classes, sort } = this.props;
        const direction = {
            [SortDirection.ASC]: 'asc',
            [SortDirection.DESC]: 'desc',
        };

        const inner =
            !columns[columnIndex].disableSort && sort != null ? (
                <TableSortLabel active={dataKey === sortBy} direction={direction[sortDirection]}>
                    {label}
                </TableSortLabel>
            ) : (
                    label
                );

        return (
            <TableCell
                component="div"
                className={classNames(classes.tableCell, classes.flexContainer, classes.noClick)}
                variant="head"
                style={{ height: headerHeight, fontFamily: 'Iceberg', fontSize: 12, color: grey[900], backgroundColor: blueGrey[50] }}
                align={columns[columnIndex].numeric || false ? 'right' : 'left'}
            >
                {inner}
            </TableCell>
        );
    };


    getUserInventory = () => {
        return axios.get('/api/inventory')
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        const { classes, columns, ...tableProps } = this.props;
        return (
            <AutoSizer>
                {({ height, width }) => (
                    <Table
                        className={classes.table}
                        height={height}
                        width={width}
                        {...tableProps}
                        rowClassName={this.getRowClassName}
                    >
                        {columns.map(({ cellContentRenderer = null, className, dataKey, ...other }, index) => {
                            let renderer;
                            if (cellContentRenderer != null) {
                                renderer = cellRendererProps =>
                                    this.cellRenderer({
                                        cellData: cellContentRenderer(cellRendererProps),
                                        columnIndex: index,
                                    });
                            } else {
                                renderer = this.cellRenderer;
                            }

                            return (
                                <Column
                                    key={dataKey}
                                    headerRenderer={headerProps =>
                                        this.headerRenderer({
                                            ...headerProps,
                                            columnIndex: index,
                                        })
                                    }
                                    className={classNames(classes.flexContainer, className)}
                                    cellRenderer={renderer}
                                    dataKey={dataKey}
                                    {...other}
                                />
                            );
                        })}
                    </Table>
                )}
            </AutoSizer>

        );
    }
}

MuiVirtualizedTable.propTypes = {
    classes: PropTypes.object.isRequired,
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            cellContentRenderer: PropTypes.func,
            dataKey: PropTypes.string.isRequired,
            width: PropTypes.number.isRequired,
        }),
    ).isRequired,
    headerHeight: PropTypes.number,
    onRowClick: PropTypes.func,
    rowClassName: PropTypes.string,
    rowHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
    sort: PropTypes.func,
};

MuiVirtualizedTable.defaultProps = {
    headerHeight: 70,
    rowHeight: 56,
};

const WrappedVirtualizedTable = withStyles(styles)(MuiVirtualizedTable);

const data =
    [
        ['Scotch', 'Glenlivet 18yr', 750, 25.36, 77.84, 15.36, 0.605, 3.07, 47.15, 2.605, 202.77],

    ];

let id = 0;
function createData(type, brandStyle, bottleSizeML, bottleSizeOZ, bottleCost, ozRemaining, percentLeft, costPerOZ, openBottleValue, totalBottlesPerBrandStyle, totalValuePerBrandStyle) {
    id += 1;
    return { id, type, brandStyle, bottleSizeML, bottleSizeOZ, bottleCost, ozRemaining, percentLeft, costPerOZ, openBottleValue, totalBottlesPerBrandStyle, totalValuePerBrandStyle };
}

const rows = [];

for (let i = 0; i < 200; i += 1) {
    const randomSelection = data[Math.floor(Math.random() * data.length)];
    rows.push(createData(...randomSelection));
}

function ReactVirtualizedTable({userInventoryData}) {
    const rows = userInventoryData;

    
    return (
        <Grid container style={nateStyles.gridContainer}>
            <Grid item xs>
                <Paper 
                    style={nateStyles.paper}
                    elevation={15}
                >
                    <WrappedVirtualizedTable
                        rowCount={rows.length}
                        rowGetter={({ index }) => rows[index]}
                        onRowClick={event => console.log(event)}
                        columns={[
                            {
                                width: 200,
                                flexGrow: 1.0,
                                label: 'Alcohol Type',
                                dataKey: 'type',
                            }, {
                                width: 200,
                                label: 'Brand/Style',
                                dataKey: 'brandStyle',
                            }, {
                                width: 140,
                                label: 'Size mL',
                                dataKey: 'sizeML',
                                numeric: true,
                            }, {
                                width: 140,
                                label: 'Oz Per Bottle',
                                dataKey: 'sizeOZ',
                                numeric: true,
                            }, {
                                width: 140,
                                label: 'Cost Per Bottle',
                                dataKey: 'costPerBottle',
                                numeric: true,
                            }, {
                                width: 140,
                                label: 'Oz Left',
                                dataKey: 'ozRemaining',
                                numeric: true,
                            }, {
                                width: 140,
                                label: 'Percent Left',
                                dataKey: 'percentBottleRemaining',
                                numeric: true,
                            }, {
                                width: 140,
                                label: 'Cost Per Oz',
                                dataKey: 'costPerOZ',
                                numeric: true,
                            }, {
                                width: 140,
                                label: 'Bottle Value',
                                dataKey: 'currentValueOfBottle',
                                numeric: true,
                            }, {
                                width: 140,
                                label: 'Total Bottles',
                                dataKey: 'totalBottles',
                                numeric: true,
                            }, {
                                width: 140,
                                label: 'Total Value',
                                dataKey: 'totalInventoryValue',
                                numeric: true,
                            }
                        ]}
                    />
                </Paper>
            </Grid>
        </Grid>
    );
}

export default ReactVirtualizedTable;