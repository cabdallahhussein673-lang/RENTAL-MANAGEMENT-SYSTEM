
using Microsoft.Data.SqlClient;
using RentalManagementSystem.Model;
using System.Data;
namespace RentalManagementSystem.Data
{
    public class ApartmentData
    {
        string conn = "Data Source=AJ\\SQLEXPRESS;Initial Catalog=Rental_Management_Systemdb;Integrated Security=True;TrustServerCertificate=True;";

        // GET ALL
        public List<Appartment> GetAll()
        {
            List<Appartment> apartments = new List<Appartment>();

            using SqlConnection cnn = new SqlConnection(conn);

            string query = "SELECT * FROM Apartments";

            SqlCommand cmd = new SqlCommand(query, cnn);

            cnn.Open();

            SqlDataReader dr = cmd.ExecuteReader();

            DataTable dt = new DataTable();

            dt.Load(dr);

            foreach (DataRow row in dt.Rows)
            {
                apartments.Add(new Appartment
                {
                    ApartmentId = Convert.ToInt32(row["ApartmentId"]),
                    ApartmentName = row["ApartmentName"].ToString(),
                    Location = row["Location"].ToString(),
                    MonthlyRent = Convert.ToDecimal(row["MonthlyRent"])
                });

                

            }
            return apartments;
        }


        // SEARCH BY ID
        public Appartment GetById(int id)
        {
            Appartment apartment = null;

            using SqlConnection cnn = new SqlConnection(conn);

            string query =
                "SELECT * FROM Apartments WHERE ApartmentId=@id";

            SqlCommand cmd = new SqlCommand(query, cnn);
            cmd.Parameters.AddWithValue("@id", id);

            cnn.Open();

            SqlDataReader dr = cmd.ExecuteReader();

            if (dr.Read())
            {
                apartment = new Appartment
                {
                    ApartmentId = Convert.ToInt32(dr["ApartmentId"]),
                    ApartmentName = dr["ApartmentName"].ToString(),
                    Location = dr["Location"].ToString(),
                    MonthlyRent = Convert.ToDecimal(dr["MonthlyRent"])
                };
            }

            return apartment;
        }

        // INSERT
        public void Add(Appartment apartment)
        {
            using SqlConnection cnn = new SqlConnection(conn);

            cnn.Open();

            // Check duplicate ApartmentId
            string checkQuery = "SELECT COUNT(*) FROM Apartments WHERE ApartmentId=@id";

            SqlCommand checkCmd = new SqlCommand(checkQuery, cnn);

            checkCmd.Parameters.AddWithValue("@id", apartment.ApartmentId);

            int count = (int)checkCmd.ExecuteScalar();

            if (count > 0)
            {
                throw new Exception("Apartment ID already exists.");
            }

            string query = @"INSERT INTO Apartments
                    (ApartmentId,ApartmentName,Location,MonthlyRent)
                    VALUES
                    (@id,@name,@location,@rent)";

            SqlCommand cmd = new SqlCommand(query, cnn);

            cmd.Parameters.AddWithValue("@id", apartment.ApartmentId);
            cmd.Parameters.AddWithValue("@name", apartment.ApartmentName);
            cmd.Parameters.AddWithValue("@location", apartment.Location);
            cmd.Parameters.AddWithValue("@rent", apartment.MonthlyRent);

            cmd.ExecuteNonQuery();
        }

        // UPDATE
        public void Update(int id, Appartment apartment)
        {
            using SqlConnection cnn = new SqlConnection(conn);

            string query = @"UPDATE Apartments
                             SET ApartmentName=@name,
                                 Location=@location,
                                 MonthlyRent=@rent
                             WHERE ApartmentId=@id";

            SqlCommand cmd = new SqlCommand(query, cnn);

            cmd.Parameters.AddWithValue("@id", id);
            cmd.Parameters.AddWithValue("@name", apartment.ApartmentName);
            cmd.Parameters.AddWithValue("@location", apartment.Location);
            cmd.Parameters.AddWithValue("@rent", apartment.MonthlyRent);

            cnn.Open();

            cmd.ExecuteNonQuery();
        }

        // DELETE
        // C#
        public bool Delete(int id)
        {
            using SqlConnection cnn = new SqlConnection(conn);
            cnn.Open();

            // Check for dependent tenants
            using (var checkCmd = new SqlCommand("SELECT COUNT(1) FROM Tenants WHERE ApartmentId = @id", cnn))
            {
                checkCmd.Parameters.AddWithValue("@id", id);
                var count = (int)checkCmd.ExecuteScalar();
                if (count > 0)
                {
                    return false; // or throw new InvalidOperationException("Apartment has tenants");
                }
            }

            using (var deleteCmd = new SqlCommand("DELETE FROM Apartments WHERE ApartmentId = @id", cnn))
            {
                deleteCmd.Parameters.AddWithValue("@id", id);
                deleteCmd.ExecuteNonQuery();
            }
            return true;
        }

        // COUNT (ExecuteScalar)
        public int CountApartments()
        {
            using SqlConnection cnn = new SqlConnection(conn);

            string query = "SELECT COUNT(*) FROM Apartments";

            SqlCommand cmd = new SqlCommand(query, cnn);

            cnn.Open();

            return (int)cmd.ExecuteScalar();
        }
    }
    
}

