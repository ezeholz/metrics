//Setup
export default async function({login, data, imports, rest, q, account}, {enabled = false} = {}) {
  //Plugin execution
  try {
    //Check if plugin is enabled and requirements are met
    if ((!enabled) || (!q.pronouns))
      return null

    //Load inputs
    let {id, pref} = imports.metadata.plugins.pronouns.inputs({data, account, q})
	
	
	if (pref !== "") return pref
	// Load Data from PronounDB
	else if(id !== "") {
	  try {
        //Query API
        console.debug(`metrics/compute/${login}/plugins > pronouns > querying api (pronounDB)`)
        const {label, message} = await imports.axios.get("https://pronoundb.org/shields/"+id)
		if (label === "pronouns") return message
		else throw "An error occured"
      }
      catch (error) {
        throw {error:{message:"An error occured", instance:error}}
      }
	}
	else throw "An error occured"

  }
  //Handle errors
  catch (error) {
    throw {error:{message:"An error occured", instance:error}}
  }
}
