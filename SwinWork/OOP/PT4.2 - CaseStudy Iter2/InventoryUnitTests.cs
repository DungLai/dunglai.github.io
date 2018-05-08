using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using NUnit.Framework;

namespace CaseStudy
{
    [TestFixture]
    public class InventoryUnitTests
    {
        Inventory TestInventory;
        Item TestItem, TestItem1;
        string testListItem;

        [SetUp()]
        public void SetUpTestObject()
        {
            TestInventory = new Inventory();
            TestItem = new Item(new string[] { "sword" }, "bronze sword", "This sword can kill you.");
            TestItem1 = new Item(new string[] { "blade" }, "dragon blade", "Level 1 blade");
            testListItem = Environment.NewLine + "    a bronze sword (sword)" + Environment.NewLine + "    a dragon blade (blade)";
        }

        [Test]
        public void TestFindItem()
        {
            //resubmit, before using SetUp()
            //Inventory TestInventory = new Inventory();
            //Item TestItem = new Item(new string[] { "sword" }, "bronze sword", "This sword can kill you.");
            //Item TestItem1 = new Item(new string[] { "blade" }, "dragon blade", "Level 1 blade");

            TestInventory.Put(TestItem);

            //Inventory can find sword
            Assert.IsTrue(TestInventory.HasItem("sword"));
        }

        [Test]
        public void TestNoItemFind()
        {
            //Inventory TestInventory = new Inventory();
            //Item TestItem = new Item(new string[] { "sword" }, "bronze sword", "This sword can kill you.");
            //Item TestItem1 = new Item(new string[] { "blade" }, "dragon blade", "Level 1 blade");

            //add item to inventory
            TestInventory.Put(TestItem);

            //test a ID that is not in inventory
            Assert.IsFalse(TestInventory.HasItem("random ID"));
        }

        [Test]
        public void TestFetchItem()
        {
            //Inventory TestInventory = new Inventory();
            //Item TestItem = new Item(new string[] { "sword" }, "bronze sword", "This sword can kill you.");
            //Item TestItem1 = new Item(new string[] { "blade" }, "dragon blade", "Level 1 blade");

            //Put item to inventory
            TestInventory.Put(TestItem);

            //Test if inventory can find it
            Assert.IsTrue(TestInventory.HasItem("sword"));

            //test return item from id
            Assert.AreSame(TestItem, TestInventory.Fetch("sword"));

            //test if id still exist in inventory after fetch
            Assert.IsTrue(TestInventory.HasItem("sword"));
        }

        [Test]
        public void TestTakeItem()
        {
            //Inventory TestInventory = new Inventory();
            //Item TestItem = new Item(new string[] { "sword" }, "bronze sword", "This sword can kill you.");
            //Item TestItem1 = new Item(new string[] { "blade" }, "dragon blade", "Level 1 blade");

            //Put item to inventory
            TestInventory.Put(TestItem);

            //Test if inventory can find it
            Assert.IsTrue(TestInventory.HasItem("sword"));

            //test return item from id
            Assert.AreSame(TestItem, TestInventory.Take("sword"));

            //test if id is removed from inventory after fetch
            Assert.IsFalse(TestInventory.HasItem("sword"));
        }

        [Test]
        public void TestItemList()
        {
            //Inventory TestInventory = new Inventory();
            //Item TestItem = new Item(new string[] { "sword" }, "bronze sword", "This sword can kill you.");
            //Item TestItem1 = new Item(new string[] { "blade" }, "dragon blade", "Level 1 blade");

            TestInventory.Put(TestItem);
            TestInventory.Put(TestItem1);

            string testListItem = Environment.NewLine + "    a bronze sword (sword)" + Environment.NewLine + "    a dragon blade (blade)";
            Assert.AreEqual(testListItem, TestInventory.ItemList);
        }
    }
}