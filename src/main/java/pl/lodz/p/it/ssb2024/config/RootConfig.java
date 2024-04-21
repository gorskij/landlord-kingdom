package pl.lodz.p.it.ssb2024.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import pl.lodz.p.it.ssb2024.config.atomikos.AtomikosConfig;
import pl.lodz.p.it.ssb2024.config.datasources.DataSourceAdmin;
import pl.lodz.p.it.ssb2024.config.datasources.DataSourceAuth;
import pl.lodz.p.it.ssb2024.config.datasources.DataSourceMok;
import pl.lodz.p.it.ssb2024.config.datasources.DataSourceMol;

@Configuration
@Import({
        AtomikosConfig.class,
        DataSourceAdmin.class,
        DataSourceMok.class,
        DataSourceMol.class,
        DataSourceAuth.class,
        ToolConfig.class,
})
public class RootConfig {
}
