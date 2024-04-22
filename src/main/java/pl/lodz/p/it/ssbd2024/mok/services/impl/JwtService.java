package pl.lodz.p.it.ssbd2024.mok.services.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwsHeader;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class JwtService {
    private final JwtEncoder encoder;

    public String generateToken(UUID id, List<String> roles) {
        Instant now = Instant.now();
        JwtClaimsSet claims = JwtClaimsSet.builder()
                .issuer("team-2.proj-sum.it.p.lodz.pl")
                .issuedAt(now)
                .expiresAt(now.plus(1, ChronoUnit.HOURS))
                .subject(id.toString())
                .claim("authorities",  roles)
                .build();

        var encoderParameters = JwtEncoderParameters.from(JwsHeader.with(MacAlgorithm.HS512).build(), claims);
        return encoder.encode(encoderParameters).getTokenValue();
    }
}
