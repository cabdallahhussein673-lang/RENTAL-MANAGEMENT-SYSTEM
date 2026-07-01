using Microsoft.Data.SqlClient;
using RentalManagementSystem.Model;
using System.Data;

namespace RentalManagementSystem.Data
{
    public class PaymentData
    {
        string conn = "Data Source=AJ\\SQLEXPRESS;Initial Catalog=Rental_Management_Systemdb;Integrated Security=True;TrustServerCertificate=True;";

        // GET ALL
        public List<Payments> GetAll()
        {
            List<Payments> paymentts = new List<Payments>();

            using SqlConnection cnn = new SqlConnection(conn);

            string query = "SELECT * FROM Payments";

            SqlCommand cmd = new SqlCommand(query, cnn);

            cnn.Open();

            SqlDataReader dr = cmd.ExecuteReader();

            DataTable dt = new DataTable();
            dt.Load(dr);

            foreach (DataRow row in dt.Rows)
            {
                paymentts.Add(new Payments
                {
                    PaymentId = Convert.ToInt32(row["PaymentId"]),
                    TenantId = Convert.ToInt32(row["TenantId"]),
                    PaymentDate = Convert.ToDateTime(row["PaymentDate"]),
                    Amount = Convert.ToDecimal(row["Amount"])
                });
            }

            return paymentts;
        }

        // GET BY ID
        public Payments GetById(int id)
        {
            Payments payment = null;

            using SqlConnection cnn = new SqlConnection(conn);

            string query = "SELECT * FROM Payments WHERE PaymentId=@id";

            SqlCommand cmd = new SqlCommand(query, cnn);

            cmd.Parameters.AddWithValue("@id", id);

            cnn.Open();

            SqlDataReader dr = cmd.ExecuteReader();

            if (dr.Read())
            {
                payment = new Payments
                {
                    PaymentId = Convert.ToInt32(dr["PaymentId"]),
                    TenantId = Convert.ToInt32(dr["TenantId"]),
                    PaymentDate = Convert.ToDateTime(dr["PaymentDate"]),
                    Amount = Convert.ToDecimal(dr["Amount"])
                };
            }

            return payment;
        }

        // INSERT
        public void Add(Payments payment)
        {
            using SqlConnection cnn = new SqlConnection(conn);

            cnn.Open();

            // Check duplicate PaymentId
            string checkQuery = "SELECT COUNT(*) FROM Payments WHERE PaymentId=@id";

            SqlCommand checkCmd = new SqlCommand(checkQuery, cnn);

            checkCmd.Parameters.AddWithValue("@id", payment.PaymentId);

            int count = (int)checkCmd.ExecuteScalar();

            if (count > 0)
            {
                throw new Exception("Payment ID already exists.");
            }

            string query = @"INSERT INTO Payments
                    (PaymentId,TenantId,PaymentDate,Amount)
                    VALUES
                    (@id,@tenantId,@date,@amount)";

            SqlCommand cmd = new SqlCommand(query, cnn);

            cmd.Parameters.AddWithValue("@id", payment.PaymentId);
            cmd.Parameters.AddWithValue("@tenantId", payment.TenantId);
            cmd.Parameters.AddWithValue("@date", payment.PaymentDate);
            cmd.Parameters.AddWithValue("@amount", payment.Amount);

            cmd.ExecuteNonQuery();
        }

        // UPDATE
        public void Update(int id, Payments payment)
        {
            using SqlConnection cnn = new SqlConnection(conn);

            string query = @"UPDATE Payments
                             SET TenantId=@tenantId,
                                 PaymentDate=@date,
                                 Amount=@amount
                             WHERE PaymentId=@id";

            SqlCommand cmd = new SqlCommand(query, cnn);

            cmd.Parameters.AddWithValue("@id", id);
            cmd.Parameters.AddWithValue("@tenantId", payment.TenantId);
            cmd.Parameters.AddWithValue("@date", payment.PaymentDate);
            cmd.Parameters.AddWithValue("@amount", payment.Amount);

            cnn.Open();

            cmd.ExecuteNonQuery();
        }

        // DELETE
        public void Delete(int id)
        {
            using SqlConnection cnn = new SqlConnection(conn);

            string query = "DELETE FROM Payments WHERE PaymentId=@id";

            SqlCommand cmd = new SqlCommand(query, cnn);

            cmd.Parameters.AddWithValue("@id", id);

            cnn.Open();

            cmd.ExecuteNonQuery();
        }

        // COUNT
        public int CountPayments()
        {
            using SqlConnection cnn = new SqlConnection(conn);

            string query = "SELECT COUNT(*) FROM Payments";

            SqlCommand cmd = new SqlCommand(query, cnn);

            cnn.Open();

            return (int)cmd.ExecuteScalar();
        }
    }
}

