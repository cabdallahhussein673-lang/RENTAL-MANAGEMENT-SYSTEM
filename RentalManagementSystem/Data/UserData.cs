using Microsoft.Data.SqlClient;
using RentalManagementSystem.Model;

namespace RentalManagementSystem.Data
{
    public class UserData
    {
        string conn = "Data Source=AJ\\SQLEXPRESS;Initial Catalog=Rental_Management_Systemdb;Integrated Security=True;TrustServerCertificate=True;";

        public User Login(string username, string password)
        {
            SqlConnection cnn = new SqlConnection(conn);

            string query = @"SELECT *
                             FROM Users
                             WHERE UserName=@UserName
                             AND Password=@Password";

            SqlCommand cmd = new SqlCommand(query, cnn);

            cmd.Parameters.AddWithValue("@UserName", username);
            cmd.Parameters.AddWithValue("@Password", password);

            cnn.Open();

            SqlDataReader reader = cmd.ExecuteReader();

            if (reader.Read())
            {
                User user = new User();

                user.UserId = Convert.ToInt32(reader["UserId"]);
                user.UserName = reader["UserName"].ToString();
                user.Password = reader["Password"].ToString();
                user.RoleId = Convert.ToInt32(reader["RoleId"]);

                return user;
            }

            return null;
        }
    }
}
