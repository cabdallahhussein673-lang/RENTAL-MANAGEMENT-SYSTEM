create database Rental_Management_Systemdb;
use Rental_Management_Systemdb;

CREATE TABLE Apartments (
    ApartmentId INT PRIMARY KEY,
    ApartmentName VARCHAR(100),
    Location VARCHAR(100),
    MonthlyRent DECIMAL(10,2)
);


CREATE TABLE Tenants (
    TenantId INT PRIMARY KEY,
    FullName VARCHAR(100),
    Phone VARCHAR(20),
    ApartmentId INT,
    FOREIGN KEY (ApartmentId) REFERENCES Apartments(ApartmentId)
);


CREATE TABLE Payments (
    PaymentId INT PRIMARY KEY,
    TenantId INT,
    PaymentDate DATE,
    Amount DECIMAL(10,2),
    FOREIGN KEY (TenantId) REFERENCES Tenants(TenantId)
);
----insertation
INSERT INTO Apartments VALUES
(1, 'Green View Apartment', 'Mogadishu', 500),
(2, 'Ocean Residence', 'Hodan', 700);

INSERT INTO Tenants VALUES
(101, 'Ahmed Ali', '0612345678', 1),
(102, 'Amina Hassan', '0623456789', 2);

INSERT INTO Payments VALUES
(1001, 101, '2026-06-01', 500),
(1002, 102, '2026-06-02', 700);

select * from Apartments
select * from Tenants
select * from Payments
