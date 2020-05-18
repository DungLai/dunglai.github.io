using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CaseStudy
{
    public class Inventory 
    {
        private List<Item> _items;

        public Inventory()
        {
            _items = new List<Item>();
        }

        public bool HasItem(string id)
        {
            foreach (Item item in _items)
            {
                if (item.AreYou(id))
                    return true;
            }

            return false;
        }

        public void Put(Item itm)
        {
            _items.Add(itm);
        }

        //return item if it exists and remove it from inventory
        public Item Take(string id)
        {
            foreach (Item item in _items)
            {
                if (item.AreYou(id))
                {
                    _items.Remove(item);
                    return item;
                }
            }

            return null;
        }

        //return the item if it exists in inventory
        public Item Fetch(string id)
        {
            foreach (Item item in _items)
            {
                if (item.AreYou(id))
                {
                    return item;
                }
            }

            return null;
        }


        //return a list of string with one row per item.
        public string ItemList
        {
            get
            {
                string list = "";

                for (int i = 0; i < _items.Count; i++)
                {
                    list += System.Environment.NewLine + "    " + _items[i].ShortDescription;
                }

                return list;
            }   
        }
    }
}
