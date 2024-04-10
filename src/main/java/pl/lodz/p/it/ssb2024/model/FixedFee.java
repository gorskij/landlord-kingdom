package pl.lodz.p.it.ssb2024.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "fixed_fees")
@Getter
@NoArgsConstructor
public class FixedFee extends AbstractEntity {
    @Column(name = "rental_fee", nullable = false, updatable = false, precision = 10, scale = 2)
    private BigDecimal rentalFee;

    @Column(name = "margin_fee", nullable = false, updatable = false, precision = 10, scale = 2)
    private BigDecimal marginFee;

    @Column(name = "date", nullable = false, updatable = false)
    private LocalDate date;

    @ManyToOne
    @JoinColumn(name = "rent_id", nullable = false, updatable = false)
    private Rent rent;

    public FixedFee(BigDecimal rentalFee, BigDecimal marginFee, LocalDate date, Rent rent) {
        this.rentalFee = rentalFee;
        this.marginFee = marginFee;
        this.date = date;
        this.rent = rent;
    }
}