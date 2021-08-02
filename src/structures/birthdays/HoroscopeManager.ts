export default {
  Zodiac_Sign(day, month): string {
    let astro_sign = "";

    if (month == "december") {
      if (day < 22) astro_sign = "Sagittarius";
      else astro_sign = "Capricorn";
    } else if (month == "January") {
      if (day < 20) astro_sign = "Capricorn";
      else astro_sign = "Aquarius";
    } else if (month == "February") {
      if (day < 19) astro_sign = "Aquarius";
      else astro_sign = "Pisces";
    } else if (month == "March") {
      if (day < 21) astro_sign = "Pisces";
      else astro_sign = "Aries";
    } else if (month == "April") {
      if (day < 20) astro_sign = "Aries";
      else astro_sign = "Taurus";
    } else if (month == "May") {
      if (day < 21) astro_sign = "Taurus";
      else astro_sign = "Gemini";
    } else if (month == "June") {
      if (day < 21) astro_sign = "Gemini";
      else astro_sign = "Cancer";
    } else if (month == "July") {
      if (day < 23) astro_sign = "Cancer";
      else astro_sign = "Leo";
    } else if (month == "August") {
      if (day < 23) astro_sign = "Leo";
      else astro_sign = "Virgo";
    } else if (month == "September") {
      if (day < 23) astro_sign = "Virgo";
      else astro_sign = "Libra";
    } else if (month == "October") {
      if (day < 23) astro_sign = "Libra";
      else astro_sign = "Scorpio";
    } else if (month == "November") {
      if (day < 22) astro_sign = "Scorpio";
      else astro_sign = "Sagittarius";
    }

    return astro_sign;
  },
};
