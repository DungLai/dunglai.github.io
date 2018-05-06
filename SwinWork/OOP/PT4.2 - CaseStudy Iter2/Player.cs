using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CaseStudy
{
    public class Player : GameObject
    {
        private Inventory _inventory;

        public override string FullDescription
        {
            get
            {
                string _fullDescription = "You are carrying:";
                _fullDescription += _inventory.ItemList;
                return _fullDescription;
            }
        }

        public Player(string name, string desc) : base(new string[] { "me", "inventory" }, name, desc)
        {
            _inventory = new Inventory();
        }

        public GameObject Locate(string id)
        {
            //if ((id == "me") || (id == "inventory"))
            // resubmit :
            if (AreYou(id))
            {
                return this;
            }
            return _inventory.Fetch(id);
        }

        public Inventory Inventory
        {
            get
            {
                return _inventory;
            }
        }
    }
}
