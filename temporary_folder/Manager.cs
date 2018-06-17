using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Data.SqlClient;
using MySql.Data.MySqlClient;
using System.Data;

namespace ClubAdmin
{
    class Manager
    {
        public Manager(string id, string name)
        {
            _id = id;
            _name = name;
        }

        private string _id;
        private string _name;
        private DataTable _memberDataTable;

        public string Id
        {
            get
            {
                return _id;
            }
        }

        public string Name
        {
            get
            {
                return _name;
            }
        }

        public DataTable MemberDataTable
        {
            get
            {
                return _memberDataTable;
            }
        }

        // Add member to member list by their id and name
        public void AddMember(string id, string name)
        {
            Member newMember = new Member(id, name);
            SQL sql = new SQL();
            sql.Execute(String.Format("INSERT INTO member (id, name, membership) VALUES ('{0}','{1}','{2}');", id, name, id));
        }

        // view all existing members
        public void ViewMember()
        {
            SQL sql = new SQL();
            MySqlDataAdapter adapter = new MySqlDataAdapter("SELECT * FROM member;", sql.Conn);
            DataTable dt = new DataTable();
            adapter.Fill(dt);
            _memberDataTable = dt;
        }

        // view members from specific faculty
        public void ViewMember(string facultyId)
        {
        }
    }
}
