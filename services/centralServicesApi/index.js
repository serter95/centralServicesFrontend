import axios from 'axios'

export const centralServiceApi = {
  async searchByCriteria (criteria) {
    let items, success
    const searchInputFormated = String(criteria).trim().replace(/\s\s*/gi, ' ')
    try {
      const response = (await axios.get(`http://localhost:3333/api/search/${searchInputFormated}`)).data
      success = true
      items = response
    } catch (error) {
      console.error(error)
      success = false
      items = []
    }

    return { success, items }
  }
}
