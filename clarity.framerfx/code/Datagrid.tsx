import * as React from "react"
import { Frame, addPropertyControls, ControlType } from "framer"
import axios from "axios"
//@ts-ignore
import { DataGrid as DataGrid_ } from "../../../clarity-react/dist/datagrid/Datagrid"

import {
    GridSelectionType,
    GridRowType,
    SortOrder,
    DataGridFilter,
    FilterType,
    //@ts-ignore
} from "../../../clarity-react/dist/datagrid/Datagrid"

import {
    normalColumns,
    normalRows,
    customRows,
    GridActions,
    sortColumns,
    expandableRows,
    filterFunction,
    sortFunction,
    paginationDetails,
    paginationRows,
    pageFilterFunction,
    hideableColumns,
    //@ts-ignore
} from "../../../clarity-react/dist/datagrid/DataGridValues"

// import { normalRows_ } from "./testData.json"
//@ts-ignore
import { CustomFilter } from "../../../clarity-react/dist/datagrid/CustomFilter"

const datagridRef = React.createRef<DataGrid_>()
const datagridActionsRef = React.createRef<GridActions>()
const datagridFilterRef = React.createRef<DataGrid_>()
const datagridFilterSortRef = React.createRef<DataGrid_>()
const datagridCustomFilterRef = React.createRef<DataGrid_>()
const datagridFullDemoRef = React.createRef<DataGrid_>()
const filterRef = React.createRef<DataGridFilter>()

export function Datagrid(props) {
    const {
        hasCustomFooter,
        customFooterString,
        hasFooter,
        hasPagination,
        ...rest
    } = props
    const [rowsData, setRowsData] = React.useState([])

    // Fetch rows data
    React.useEffect(() => {
        const fetchData = async () => {
            const result = await axios(props.rowsUrl)
            setRowsData(result.data)
        }
        fetchData()
    }, [])

    // Generate columns
    var columnArr = []
    let numberOfColumns = props.columnItems.length

    for (var i = 0; i < numberOfColumns; i++) {
        let columnTitle = props.columnItems[i]
        columnArr.push({
            columnName: `${columnTitle}`,
        })
    }

    // Footer
    let footerData
    if (hasCustomFooter) {
        footerData = customFooterString
    }
    const footer = {
        footerData: footerData,
        showFooter: hasFooter,
    }

    // Pagination

    let pagination
    if (hasPagination) {
        pagination = paginationDetails
    }

    const expandable = props.expandable ? GridRowType.EXPANDABLE : null
    const selection = props.hasSelection ? props.selectionType : null

    return (
        <Frame size="100%" background={null}>
            <DataGrid_
                {...props}
                ref={datagridRef}
                columns={columnArr}
                rows={rowsData}
                footer={footer}
                selectionType={selection}
                rowType={expandable}
                style={{ height: "100%" }}
                pagination={pagination}
                // onRowSelect={() => {
                //     const rows = datagridRef.current!.getSelectedRows()
                //     datagridActionsRef.current!.updateActions(rows)
                //     let j = JSON.stringify(rows)
                //     let jj = JSON.parse(j)
                //     console.log(jj[0].rowID)
                // }}
                // onSelectAll={() => {
                //     const rows = datagridRef.current!.getSelectedRows()
                //     datagridActionsRef.current!.updateActions(rows)
                // }}
            />
        </Frame>
    )
}

Datagrid.defaultProps = {
    columnItems: ["Column 1", "Column 2", "Column 3", "Column 4"],
    showFooter: true,
}

addPropertyControls(Datagrid, {
    rowsUrl: {
        type: ControlType.File,
        title: "Rows data",
        allowedFileTypes: ["json"],
    },
    columnItems: {
        type: ControlType.Array,
        title: "Columns",
        propertyControl: {
            type: ControlType.String,
            placeholder: "Type name",
            defaultValue: "New item",
        },
        maxCount: 10,
    },
    hasFooter: {
        type: ControlType.Boolean,
        title: "Footer",
        enabledTitle: "Yes",
        disabledTitle: "No",
    },
    hasCustomFooter: {
        type: ControlType.Boolean,
        defaultValue: false,
        title: "Custom footer",
        enabledTitle: "Yes",
        disabledTitle: "No",
    },
    customFooterString: {
        type: ControlType.String,
        title: "Footer text",
        defaultValue: "Custom footer text",
        placeholder: "Footer text",
        hidden(props) {
            return props.customFilter === false
        },
    },
    hasSelection: {
        type: ControlType.Boolean,
        title: "Has selection",
        defaultValue: false,
        enabledTitle: "Yes",
        disabledTitle: "No",
    },
    selectionType: {
        type: ControlType.SegmentedEnum,
        title: "Custom footer",
        options: [GridSelectionType.SINGLE, GridSelectionType.MULTI],
        optionTitles: ["Radio", "Checkbox"],
        defaultValue: GridSelectionType.MULTI,
        hidden(props) {
            return props.hasSelection === false
        },
    },
    expandable: {
        type: ControlType.Boolean,
        defaultValue: false,
        title: "Expandable",
        enabledTitle: "Yes",
        disabledTitle: "No",
    },
    hasPagination: {
        type: ControlType.Boolean,
        defaultValue: false,
        title: "Pagination",
        enabledTitle: "Yes",
        disabledTitle: "No",
    },
})
