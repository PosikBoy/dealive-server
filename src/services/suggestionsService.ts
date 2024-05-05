import axios from "axios";

class SuggestionsService {
  async getSuggestions(address: string) {
    const result = await axios.post<any>(
      "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address",
      {
        query: address,
        count: 5,
        locations_boost: [{ kladr_id: 77 }, { kladr_id: 50 }],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Token " + process.env.DADATA_KEY,
        },
      }
    );
    const suggestions = result.data.suggestions.map((suggestion: any) => {
      return {
        value: suggestion.value,
      };
    });
    return suggestions;
  }
}

const suggestionsService = new SuggestionsService();
export default suggestionsService;
