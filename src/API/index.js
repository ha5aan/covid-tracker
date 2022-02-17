const url ="https://covid19.mathdro.id/api";

export const fetchData = async(country)=>{
    let changeableURL=url;
    if(country){
        changeableURL=`${url}/countries/${country}`
    }
    try {
        const  response = await fetch(changeableURL)
        const {confirmed,recovered,deaths,lastUpdate}= await response.json()
      console.log(confirmed)
       return {confirmed,recovered,deaths,lastUpdate}

    } catch (error) {
        
    }
}

export const fetchDailyData=async()=>{
    try {
        const response= await (await fetch(`${url}/daily`)).json()
        // console.log(response)
        const modifiedData=response.map((dailydata)=>({
confirmed:dailydata.confirmed.total,
deaths:dailydata.deaths.total,
date:dailydata.reportDate,
        }))
        return modifiedData
    } catch (error) {
        
    }
}

export const fetchCountriesData = async()=>{
    try {
        let response =await fetch(`${url}/countries`)
           // console.log(await response.json())
            response = await response.json()
            response = response.countries
            // console.log("Countries",response[0],"Contries")
        // response.map((response)=>{return( response.name)})
        return response.map((response)=>response.name)
    } catch (error) {
        
    }
}