import apiSlice from "../api/apiSlice";

const ayahSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        arabicAyah: builder.query({
            query: ({ surah, ayah }) => `ayah/${surah}:${ayah}`,
        }),
        englishAyah: builder.query({
            query: ({ surah, ayah }) => `ayah/${surah}:${ayah}/en.sahih`,
        }),
        audioAyah: builder.query({
            query: ({ surah, ayah }) => `ayah/${surah}:${ayah}/ar.hudhaify`,
        }),
    }),
})

export default ayahSlice.reducer;
export const { useArabicAyahQuery, useAudioAyahQuery, useEnglishAyahQuery } = ayahSlice;

