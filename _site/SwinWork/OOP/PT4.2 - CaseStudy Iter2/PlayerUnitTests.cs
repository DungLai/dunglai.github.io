using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using NUnit.Framework;

namespace CaseStudy
{
    [TestFixture]
    public class PlayerUnitTests
    {
        [Test]
        public void Test()
        {
            Player TestPlayer = new Player("PlayerName", "PlayerDescription");

            Assert.IsNotNull(TestPlayer.Inventory);
        }

        [Test]
        public void TestPlayerIsIdentifiable()
        {
            Player TestPlayer = new Player("PlayerName", "PlayerDescription");

            Assert.IsTrue(TestPlayer.AreYou("me"));
            Assert.IsTrue(TestPlayer.AreYou("inventory"));
        }

        [Test]
        public void TestPlayerLocatesItems()
        {
            Player TestPlayer = new Player("PlayerName", "PlayerDescription");
            Item TestItem = new Item(new string[] { "sword" }, "bronze sword", "This sword can kill you.");

            TestPlayer.Inventory.Put(TestItem);

            Assert.AreSame(TestItem, TestPlayer.Locate("sword"));
        }

        [Test]
        public void TestPlayerLocatesItself()
        {
            Player TestPlayer = new Player("PlayerName", "PlayerDescription");

            Assert.AreSame(TestPlayer, TestPlayer.Locate("inventory"));
            Assert.AreSame(TestPlayer, TestPlayer.Locate("me"));
        }

        [Test]
        public void TestPlayerLocatesNothing()
        {
            Player TestPlayer = new Player("PlayerName", "PlayerDescription");

            Assert.IsNull(TestPlayer.Locate("random ID"));
        }

        [Test]
        public void TestPlayerFullDescription()
        {
            Player TestPlayer = new Player("PlayerName", "PlayerDescription");
            Item TestItem = new Item(new string[] { "sword" }, "bronze sword", "This sword can kill you.");
            Item TestItem1 = new Item(new string[] { "blade" }, "dragon blade", "Level 1 blade");

            TestPlayer.Inventory.Put(TestItem);
            TestPlayer.Inventory.Put(TestItem1);

            string expectedFullDescription;
            expectedFullDescription = "You are carrying:" + Environment.NewLine + "    a bronze sword (sword)" + Environment.NewLine + "    a dragon blade (blade)";

            Assert.AreEqual(expectedFullDescription, TestPlayer.FullDescription);
        }
    }
}