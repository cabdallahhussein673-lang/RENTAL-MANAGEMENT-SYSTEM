using Microsoft.Data.SqlClient;
using RentalManagementSystem.Model;
using System.Data;

namespace RentalManagementSystem.Data
{
    public class TenantData
    {
        string conn = "Data Source=AJ\\SQLEXPRESS;Initial Catalog=Rental_Management_Systemdb;Integrated Security=True;TrustServerCertificate=True;";

        // GET ALL
        public List<Tenants> GetAll()
        {
            List<Tenants> tenantts = new List<Tenants>();

            using SqlConnection cnn = new SqlConnection(conn);

            string query = "SELECT * FROM Tenants";

            SqlCommand cmd = new SqlCommand(query, cnn);

            cnn.Open();

            SqlDataReader dr = cmd.ExecuteReader();

            DataTable dt = new DataTable();
            dt.Load(dr);

            foreach (DataRow row in dt.Rows)
            {
                tenantts.Add(new Tenants
                {
                    TenantId = Convert.ToInt32(row["TenantId"]),
                    FullName = row["FullName"].ToString(),
                    Phone = row["Phone"].ToString(),
                    ApartmentId = Convert.ToInt32(row["ApartmentId"])
                });
            }

            return tenantts;
        }

        // GET BY ID
        public Tenants GetById(int id)
        {
            Tenants tenantts = null;

            using SqlConnection cnn = new SqlConnection(conn);

            string query = "SELECT * FROM Tenants WHERE TenantId=@id";

            SqlCommand cmd = new SqlCommand(query, cnn);
            cmd.Parameters.AddWithValue("@id", id);

            cnn.Open();

            SqlDataReader dr = cmd.ExecuteReader();

            if (dr.Read())
            {
                tenantts = new Tenants
                {
                    TenantId = Convert.ToInt32(dr["TenantId"]),
                    FullName = dr["FullName"].ToString(),
                    Phone = dr["Phone"].ToString(),
                    ApartmentId = Convert.ToInt32(dr["ApartmentId"])
                };
            }

            return tenantts;
        }

        // INSERT
        public void Add(Tenants tenant)
        {
            using SqlConnection cnn = new SqlConnection(conn);

            string query = @"INSERT INTO Tenants
                            (TenantId, FullName, Phone, ApartmentId)
                            VALUES
                            (@id, @name, @phone, @apartmentId)";

            SqlCommand cmd = new SqlCommand(query, cnn);

            cmd.Parameters.AddWithValue("@id", tenant.TenantId);
            cmd.Parameters.AddWithValue("@name", tenant.FullName);
            cmd.Parameters.AddWithValue("@phone", tenant.Phone);
            cmd.Parameters.AddWithValue("@apartmentId", tenant.ApartmentId);

            cnn.Open();

            cmd.ExecuteNonQuery();
        }

        // UPDATE
        public void Update(int id, Tenants tenant)
        {
            using SqlConnection cnn = new SqlConnection(conn);

            string query = @"UPDATE Tenants
                             SET FullName=@name,
                                 Phone=@phone,
                                 ApartmentId=@apartmentId
                             WHERE TenantId=@id";

            SqlCommand cmd = new SqlCommand(query, cnn);

            cmd.Parameters.AddWithValue("@id", id);
            cmd.Parameters.AddWithValue("@name", tenant.FullName);
            cmd.Parameters.AddWithValue("@phone", tenant.Phone);
            cmd.Parameters.AddWithValue("@apartmentId", tenant.ApartmentId);

            cnn.Open();

            cmd.ExecuteNonQuery();
        }

        // DELETE
        // C#
        public void Delete(int id)
        {
            using SqlConnection cnn = new SqlConnection(conn);
            cnn.Open();
            using var tran = cnn.BeginTransaction();
            try
            {
                // remove payments that reference this tenant
                using (var cmd = new SqlCommand("DELETE FROM Payments WHERE TenantId = @id", cnn, tran))
                {
                    cmd.Parameters.AddWithValue("@id", id);
                    cmd.ExecuteNonQuery();
                }

                // now remove the tenant
                using (var cmd = new SqlCommand("DELETE FROM Tenants WHERE TenantId = @id", cnn, tran))
                {
                    cmd.Parameters.AddWithValue("@id", id);
                    int affected = cmd.ExecuteNonQuery();
                    if (affected == 0)
                    {
                        tran.Rollback();
                        throw new InvalidOperationException("Tenant not found during delete.");
                    }
                }

                tran.Commit();
            }
            catch
            {
                tran.Rollback();
                throw;
            }
        }

        // COUNT
        public int CountTenants()
        {
            using SqlConnection cnn = new SqlConnection(conn);

            string query = "SELECT COUNT(*) FROM Tenants";

            SqlCommand cmd = new SqlCommand(query, cnn);

            cnn.Open();

            return (int)cmd.ExecuteScalar();
        }
    }
}
    

