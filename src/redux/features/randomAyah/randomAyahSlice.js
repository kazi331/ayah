import apiSlice from "../api/apiSlice";




const randomAyahSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        randomArabicAyah: builder.query({
            query: (ayahNumber) => `ayah/${ayahNumber}`,
        }),
        randomEnglishAyah: builder.query({
            query: (ayahNumber) => `ayah/${ayahNumber}/en.sahih`,
        }),
        randomAudioAyah: builder.query({
            query: (ayahNumber) => `ayah/${ayahNumber}/ar.hudhaify`,
        }),
    }),
})

export default randomAyahSlice.reducer;
export const { useRandomArabicAyahQuery, useRandomAudioAyahQuery, useRandomEnglishAyahQuery } = randomAyahSlice;

