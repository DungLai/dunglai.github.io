using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using NUnit.Framework;

namespace CaseStudy
{
    [TestFixture]
    public class ItemUnitTests
    {
        Item TestItem = new Item(new string[] { "sword" }, "bronze sword", "This sword can kill you.");

        [Test]
        public void TestItemIsIdentifiable()
        {
            //test id exists
            Assert.IsTrue(TestItem.AreYou("sword"));

            //test id not exists
            Assert.IsFalse(TestItem.AreYou("blade"));
        }

        [Test]
        public void TestShortDescription()
        {
            Assert.AreEqual("a bronze sword (sword)", TestItem.ShortDescription);
        }

        [Test]
        public void TestFullDescription()
        {
            Assert.AreEqual("This sword can kill you.", TestItem.FullDescription);
        }
    }
}