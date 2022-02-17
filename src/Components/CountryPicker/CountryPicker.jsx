import React , {useState,useEffect} from "react";
import {NativeSelect,FormControl} from '@mui/material'
import styles from './countryPicker.module.scss'

import { fetchCountriesData } from "../../API";
const CountryPicker =(props)=>{

const [fetchCountry,setfetchCountry] = useState([])
    useEffect(()=>{
        const fetchCountries=async()=>{
setfetchCountry(await fetchCountriesData())
        }

        fetchCountries()
    },[setfetchCountry])

    return(
<FormControl className={styles.formControl}>
<NativeSelect onChange={(e)=>{props.handleCountryChange(e.target.value)}}>

    <option value="global">
        Global
    </option>

    {fetchCountry.map((country,i)=><option value={country} key={i}>{country}</option>)}
</NativeSelect>

</FormControl>
    )
}

export default CountryPicker;
