using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Data.SqlClient;
using MySql.Data.MySqlClient;

namespace ClubAdmin
{
    class SQL
    {
        private MySqlConnection _conn;

        public SQL()
        {
            string host = "192.168.0.9";
            int port = 3306;
            string database = "clubadmin";
            string username = "root";
            string password = "root";

            String connString = "Server=" + host + ";Database=" + database
                + ";port=" + port + ";User Id=" + username + ";password=" + password + ";SslMode=none";

            _conn = new MySqlConnection(connString);
        }

        public MySqlConnection Conn
        {
            get
            {
                return _conn;
            }
        }

        // Create connection to database using ipv4 address.
        public void CreateConnection()
        {
            try
            {
                _conn.Open();
                MessageBox.Show("Connection successful!");
                _conn.Close();
            }
            catch (Exception ex)
            {
                MessageBox.Show("Error: " + ex.Message);
            }
        }

        // Execute a SQL query
        public void Execute(string query)
        {
            _conn.Open();

            MySqlCommand cmd = new MySqlCommand(query, _conn);
            try
            {
                MySqlDataReader rdr = cmd.ExecuteReader();
                MessageBox.Show("Querry has been executed successfully");
            }
            // Display the sql error via a message box
            catch (Exception ex)
            {
                MessageBox.Show("SQL Error: " + ex.Message);
            }

            _conn.Close();
        }
    }
}
