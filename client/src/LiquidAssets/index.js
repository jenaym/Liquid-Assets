import React, { Fragment } from "react"
import FormComponent from "./FormComponent"
import TableComponent from "./TableComponent"
import ImageComponent from "./ImageComponent"
import { Grid } from '@material-ui/core'
import { CSVLink } from "react-csv";
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
                        formInputErrors={props.formInputErrors}
                    />
                </Grid>

                <Grid item xs>
                    <ImageComponent
                        formInputs={props.formInputs}
                        handleInputChange={props.handleInputChange} />
                </Grid>

            </Grid>

            <Grid container>

                <Grid item xs>
                    <TableComponent
                        userInventoryData={props.userInventoryData}
                    />
                    <CSVLink
                        data={props.userInventoryData}
                        filename={"my-inventory.csv"}
                        className="btn btn-primary"
                        target="_blank"
                        onClick={() => { 
                        console.log("You click the link"); // 👍🏻 Your click handling logic

                    }}
                    >
                        Download me
                    </CSVLink>
                </Grid>

            </Grid>

            {/* <IntegrationAutosuggest
                getBoozeSuggestions={props.getBoozeSuggestions}
                autosuggest={props.autosuggest}
            /> */}
        </Fragment>

    )

}

