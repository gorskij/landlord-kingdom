package pl.lodz.p.it.ssbd2024.util;

import java.time.DateTimeException;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.FormatStyle;
import java.util.Locale;

public class TimezoneMapper {

    public static ZonedDateTime convertUTCToAnotherTimezoneFull(LocalDateTime dateTime, String timezone) throws DateTimeException {
        ZoneId destZoneId = ZoneId.of(timezone);
        ZonedDateTime zonedDateTime = dateTime.atZone(destZoneId);

        return zonedDateTime;
    }

    public static String convertUTCToAnotherTimezoneSimple(LocalDateTime dateTime, String timezone, String lang) throws DateTimeException {
        Locale locale = Locale.of(lang);
        DateTimeFormatter formatter = DateTimeFormatter.ofLocalizedDateTime(FormatStyle.SHORT).withLocale(locale);

        ZonedDateTime longDate = convertUTCToAnotherTimezoneFull(dateTime, timezone);
        String shortDate = longDate.format(formatter);

        return shortDate;
    }
}