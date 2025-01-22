export const fetchCovidData = async () => {
    try {
      const response = await fetch(
        "https://covid19.ddc.moph.go.th/api/Cases/today-cases-by-provinces"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data)
      return data;
    } catch (error) {
      console.error("Error fetching Covid-19 data:", error);
      return [];
    }
  };
  