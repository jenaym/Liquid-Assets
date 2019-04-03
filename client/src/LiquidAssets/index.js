import React, { Fragment } from "react"
import FormComponent from "./FormComponent"
// import ReactVirtualizedTable from "./TableComponent"
import ImageComponent from "./ImageComponent"
import { Grid } from '@material-ui/core'
// import DataTable from "../DataTable";
// import BrandStyleIntegrationAutosuggest from "./BrandStyleIntegrationAutosuggest";

export default props => {
    return (
        <Fragment>
            <Grid container>

                <Grid item xs>
                    <FormComponent
                        // getBoozeSuggestions={props.getBoozeSuggestions}
                        // autosuggest={props.autosuggest}
                        formInputs={props.formInputs}
                        handleInputChange={props.handleInputChange}
                        postToInventory={props.postToInventory}
                        getUserInventory={props.getUserInventory}
                        postThenGet={props.postThenGet}

                    />
                </Grid>

                <Grid item xs>
                    <ImageComponent
                        formInputs={props.formInputs}
                        handleInputChange={props.handleInputChange} />
                </Grid>

            </Grid>

            <Grid container>

                {/* <Grid item xs>
                     <DataTable
                        headers={props.headers}
                        rows={props.rows}
                        
                    />
                </Grid> */}

            </Grid>

            {/* <IntegrationAutosuggest
                getBoozeSuggestions={props.getBoozeSuggestions}
                autosuggest={props.autosuggest}
            /> */}
        </Fragment>

    )

}

