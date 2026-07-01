namespace RentalManagementSystem.Model
{
    public class Payments
    {
        public int PaymentId { get; set; }

        public int TenantId { get; set; }

        public DateTime PaymentDate { get; set; }

        public decimal Amount { get; set; }
    }
}
