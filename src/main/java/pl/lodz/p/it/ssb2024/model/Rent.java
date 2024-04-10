package pl.lodz.p.it.ssb2024.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "rents")
@NoArgsConstructor
@Getter
public class Rent extends AbstractEntity {
    @ManyToOne
    @JoinColumn(name = "local_id", nullable = false, updatable = false)
    private Local local;

    @ManyToOne
    @JoinColumn(name = "tenant_id", nullable = false, updatable = false)
    private Tenant tenant;

    @ManyToOne
    @JoinColumn(name = "owner_id", nullable = false, updatable = false)
    private Owner owner;

    @Column(name = "start_date", nullable = false, updatable = false)
    private LocalDate startDate;

    @Column(name = "end_date", nullable = false)
    @Setter
    private LocalDate endDate;

    @Column(name = "balance", nullable = false, precision = 10, scale = 2)
    @Setter
    private BigDecimal balance;

    public Rent(Local local,
                Tenant tenant,
                Owner owner,
                LocalDate startDate,
                LocalDate endDate,
                BigDecimal balance) {
        this.local = local;
        this.tenant = tenant;
        this.owner = owner;
        this.startDate = startDate;
        this.endDate = endDate;
        this.balance = balance;
    }
}