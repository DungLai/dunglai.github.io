using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Data.SqlClient;
using MySql.Data.MySqlClient;

namespace ClubAdmin
{
    public partial class Form1 : Form
    {
        private SQL Sql;
        private Manager manager;

        public Form1()
        {
            InitializeComponent();
        }

        private void Form1_Load(object sender, EventArgs e)
        {
            Sql = new SQL();
            manager = new Manager("m01", "Charlie");
        }

        // add member button
        private void button1_Click(object sender, EventArgs e)
        {
            manager.AddMember(IdTextbox.Text, NameTextbox.Text);
        }

        // Connect to database button
        private void button2_Click(object sender, EventArgs e)
        {
            Sql.CreateConnection();
        }

        // View members
        private void button2_Click_1(object sender, EventArgs e)
        {
           manager.ViewMember();
           dataGridView1.DataSource = manager.MemberDataTable;
        }

        private void label1_Click(object sender, EventArgs e)
        {

        }

        private void IdTextbox_TextChanged(object sender, EventArgs e)
        {

        }

        private void dataGridView1_CellContentClick(object sender, DataGridViewCellEventArgs e)
        {

        }

        private void dataGridView1_CellContentClick_1(object sender, DataGridViewCellEventArgs e)
        {

        }
    }
}
