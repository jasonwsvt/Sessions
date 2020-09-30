/* DataManager: generic data hosting
   SessionDataManager: dataManager extension for hosting session storage data.
                        Data is clear text.
   LocalDataManager:   dataManager extension for hosting localStorage data.
                        Data is stored in a username variable and
                        is either clear text or hashed with a password.
   ServerDataManager: dataManager extension for hosting server data
                        Data is accessed with a username and password.
*/

class DataManager {
    _localData = null;
    _serverData = null;
    _sessionData = null;
    _useLocalData = false;
    _useServerData = false;
    _user = null;
    _sessionsObject = null;
    _issueName = null;
    _issueSessions = [];
    _sessionName = null;

    constructor(sessionsObject) {
        var self = this;

        this._sessionsObject = sessionsObject;
        this._sessionData = new SessionDataManager(this._sessionsObject);

        this.checkLocalDataForUser();

        $(document).ready(function() {
//            self.linesDiv.on("change", function() {
//                self.storeSession();
//            });
        });
    }

    get lines()    { return this._sessionsObject.lines; }
    get session()  { return this._sessionsObject.session; }

    get activateLocalStorage() {
        if (this._local == null) { this._local = new LocalDataManager(this._lines); }
    }

    get activateServerStorage() {
        if (this._server == null) { this._server = new ServerDataManager(this._lines); }
    }

    checkLocalDataForUser() {
        //see if there's a user record
        //if it has the remember me checked, get the values for using local and server storage
        //if ( == true) { this.activateLocalStorage; }
        //if ( == true) { this.activateServerStorage; }
    }

    //gets a stringified JSON of all the Because Reasons components from the server
    getButtons() {
        return becauseReasonsButtonsData;
        //check if buttons are stored in localstorage, if so, check the version
        //pull the version of the most recent buttons from server
        //if the local version is older than the server version, or there is no local version,
        //pull buttons json data with ajax from the Node server
    }

    createServerAccount() {
        //
    }

    verifyLoginCredentials() {
        //if it's a new location, ensure through email that it's okay
    }

    successfulLoginProcedure() {
        //find out which storage types are okay on this computer
        //if there's any data in local or session storage that isn't on the server,
        //or has a newer lastUpdated timestamp than on the server, update it.
        //synchronizeData()
        //get issue names and names of all sessions for each issue
        //get most recent issue name
        //get most recently accessed session for the most recent issue
    }

    synchronizeData() {

    }

    getIssues() {
        
    }

    //if it's available in sessionData, get it.  If not, local (if _useLocalData), if not, server (if _useServerData)
    pickIssue(issueName) {
        this._issueName = issueName;
        this._sessionData.getIssueSessionNames();
        this._sessionName = mostRecentSession();
        this._sessionData.getSession();
    }

    pickSession(sessionName) {
        this._sessionName = sessionName;
        this._loadSession(this._sessionData.getSession());

    }

    getIssueSessionNames() {
        this._issueSessions = [];
        this._sessionData.getIssueSessionNames;
        this._issueSessions.sort(function(a,b) { return Number(a)-Number(b); });
    }

    get issueName() {
        return this._issueName;
    }

    get sessionName() {
        return this._sessionName;
    }

    storeSession() {
        this._sessionData.storeSession();
        if (this._useLocalData) { this._localData.storeSession(); }
        if (this._useServerData) { this._serverData.storeSession(); }
    }
}

becauseReasonsButtonsData = [
    {
        "name": "Emotions and Psychological Reversals",
        "tier": 1,
        "group":
        [
            {
                "name": "Emotions",	
                "tier": 2,
                "wrap": false,
                "group":	
                [
                    {
                        "name": "Peace",	
                        "tier": 3,
                        "group":	
                        [
                            "Enlightenment",
                            "Ecstasy",
                            "Jubilation",
                            "Jolliness",
                            "Joviality",
                            "Euphoria",
                            "Exhilaration",
                            "Enthrallment",
                            "Excitement",
                            "Humility",
                            "Honesty",
                            "Bliss",
                            "Gentility",
                            "Elation",
                            "Happiness",
                            "Humanity",
                            "Sympathy",
                            "Composure",
                            "Security",
                            "Tolerance",
                            "Peace"
                            ]
                    },
                    {
                        "name": "Love",	
                        "tier": 3,
                        "group":	
                        [
                            "Fondness",
                            "Generosity",
                            "Compassion",
                            "Togetherness",
                            "Rapture",
                            "Enjoyment",
                            "Innocence",
                            "Infatuation",
                            "Relief",
                            "Sentimentality",
                            "Adoration",
                            "Wisdom",
                            "Delight",
                            "Gaiety",
                            "Repentance",
                            "Zest",
                            "Zeal",
                            "Joy",
                            "Truth",
                            "Pity",
                            "Tenderness",
                            "Repose",
                            "Wonder",
                            "Shyness",
                            "Modesty",
                            "Affection",
                            "Arousal",
                            "Love"
                            ]
                    },
                    {
                        "name": "Reason",	
                        "tier": 3,
                        "group":	
                        [
                            "Familiarity",
                            "Triumph",
                            "Pleasure",
                            "Contentment",
                            "Satisfaction",
                            "Effort",
                            "Surprise",
                            "Awe",
                            "Reason"
                            ]
                    },
                    {
                        "name": "Acceptance",	
                        "tier": 3,
                        "group":	
                        [
                            "Passion",
                            "Enthusiasm",
                            "Eagerness",
                            "Expectation",
                            "Glee",
                            "Trust",
                            "Amazement",
                            "Caring",
                            "Gladness",
                            "Acceptance"
                            ]
                    },
                    {
                        "name": "Willingness",	
                        "tier": 3,
                        "group":	
                        [
                            "Amusement",
                            "Hope",
                            "Cheerfulness",
                            "Confidence",
                            "Willingness"
                            ]
                    },
                    {
                        "name": "Interest",	
                        "tier": 3,
                        "group":	
                        [
                            "Astonishment",
                            "Calm",
                            "Appreciation",
                            "Contact",
                            "Fortunate",
                            "Unacceptance",
                            "Discovery",
                            "Boldness",
                            "Optimism",
                            "Interest"
                            ]
                    },
                    {
                        "name": "Courage",	
                        "tier": 3,
                        "group":	
                        [
                            "Unwillingness",
                            "Neutrality",
                            "Unfortunate",
                            "Patience",
                            "Irritation",
                            "Respect",
                            "Liking",
                            "Closeness",
                            "Relaxation",
                            "Disinterest",
                            "Courage"
                            ]
                    },
                    {
                        "name": "Pride",	
                        "tier": 3,
                        "group":	
                        [
                            "Humiliation",
                            "Reluctance",
                            "Dislike",
                            "Disrespect",
                            "Rejection",
                            "Luckiness",
                            "Unappreciation",
                            "Sadness",
                            "Cruelty",
                            "Ferocity",
                            "Arrogance",
                            "Drama",
                            "Pride"
                            ]
                    },
                    {
                        "name": "Anger",
                        "tier": 3,
                        "group":	
                        [
                            "Dissatisfaction",
                            "Resentment",
                            "Avarice",
                            "Displeasure",
                            "Unluckiness",
                            "Scorn",
                            "Dishonesty",
                            "Contempt",
                            "Unhappiness",
                            "Bitterness",
                            "Disgust",
                            "Outrage",
                            "Panic",
                            "Wrath",
                            "Hatred",
                            "Envy",
                            "Fury",
                            "Frustration",
                            "Repulsion",
                            "Lust",
                            "Jealousy",
                            "Rage",
                            "Hate",
                            "Vengefulness",
                            "Unsympathy",
                            "Anger"
                            ]
                    },
                    {
                        "name": "Desire",	
                        "tier": 3,
                        "group":	
                        [
                            "Self-pity",
                            "Alienation",
                            "Rashness",
                            "Intolerance",
                            "Aggravation",
                            "Agitation",
                            "Impatience",
                            "Loathing",
                            "Discouragement",
                            "Loneliness",
                            "Weariness",
                            "Attraction",
                            "Hurt",
                            "Timidity",
                            "Hopelessness",
                            "Stinginess",
                            "Desire"
                            ]
                    },
                    {
                        "name": "Fear",	
                        "tier": 3,
                        "group":	
                        [
                            "Greed",
                            "Thrill",
                            "Unconfidence",
                            "Annoyance",
                            "Nervousness",
                            "Woe",
                            "Cowardice",
                            "Insecurity",
                            "Longing",
                            "Distress",
                            "Shock",
                            "Exasperation",
                            "Alarm",
                            "Caution",
                            "Apprehension",
                            "Uneasiness",
                            "Defeat",
                            "Anxiety",
                            "Fear"
                            ]
                    },
                    {
                        "name": "Regret",
                        "tier": 3,
                        "group":	
                        [
                            "Fright",
                            "Worry",
                            "Dysphoria",
                            "Confusion",
                            "Grumpiness",
                            "Grouchiness",
                            "Privacy",
                            "Stress",
                            "Torment",
                            "Melancholy",
                            "Grief",
                            "Regret"
                            ]
                    },
                    {
                        "name": "Apathy",	
                        "tier": 3,
                        "group":	
                        [
                            "Embarrassment",
                            "Isolation",
                            "Spite",
                            "Horror",
                            "Mortification",
                            "Dismay",
                            "Misery",
                            "Hostility",
                            "Submission",
                            "Apathy"
                            ]
                    },
                    {
                        "name": "Guilt",	
                        "tier": 3,
                        "group":	
                        [
                            "Indifference",
                            "Disappointment",
                            "Detachment",
                            "Inhumanity",
                            "Hysteria",
                            "Guilt"
                            ]
                    },
                    {
                        "name": "Shame",	
                        "tier": 3,
                        "group":	
                        [
                            "Depression",
                            "Revulsion",
                            "Falsity",
                            "Shame"
                            ]
                    },
                    {
                        "name": "Low Level Emotions",	
                        "tier": 3,
                        "group":	
                        [
                            "Remorse",
                            "Sorrow",
                            "Anguish",
                            "Glumness",
                            "Gloom",
                            "Insult",
                            "Dejection",
                            "Agony",
                            "Suffering",
                            "Despair",
                            "Terror",
                            "Dread",
                            "Destructiveness",
                            "Death",
                            "Fullstop"
                            ]
                    }
                ]
            },
            {
                "name": "Psychological Reversals",
                "tier": 2,
                "group":
                [
                    "Belief",
                    "Benefit",
                    "Capability",
                    "Contract",
                    "Deprivation",
                    "Deservedness",
                    "Desire",
                    "Determination",
                    "Doubt",
                    "Identity",
                    "Motivation",
                    "Permission",
                    "Possibility",
                    "Privacy",
                    "Safety",
                    "Shame"        
                ]
            }
        ]
    },
    {
        "name": "Conjunctions and Characteristics",
        "tier": 1,
        "group":
        [
            {
                "name": "Conjunctions",
                "tier": 2,
                "group":
                [
                    "- (dash)",
                    ",",
                    "/ (slash)",
                    "! (bang)",
                    "& (ampersand)",
                    "# (pound)",
                    "and",
                    "at",
                    "at/above",
                    "at/below",
                    "at/between",
                    "above",
                    "below",
                    "between",
                    "cross",
                    "crossed by",
                    "nand",
                    "nor",
                    "of",
                    "or",
                    "section of",
                    "subset of",
                    "subset/section of",
                    "subset|section of",
                    "with",
                    "without",
                    "xnor"
                ]
            },
            {
                "name": "Characteristics",
                "tier": 2,
                "group":
                [
                    "of others",
                    "Negation",
                    "Extranormal level",
                    "Deep Level",
                    "Intervening",
                    "Recurrent",
                    "Tradition",
                    "Remaining",
                    "Resistance to"
                ]
            }
        ]
    },
    {
        "name": "Conscious Systems",
        "tier": 1,
        "group":
        [
            {
                "name": "Senses",
                "tier": 2,
                "group":
                [
                    {
                        "name": "Vision",
                        "tier": 3,
                        "group":
                        [
                            "Brightness",
                            "Color",
                            "Depth"
                        ]
                    },
                    {
                        "name": "Taste",
                        "tier": 3,
                        "group":
                        [
                            "Sour",
                            "Salty",
                            "Bitter",
                            "Sweet",
                            "Savory",
                            "Spicy"
                        ]
                    },
                    {
                        "name": "Somatosensory",
                        "tier": 3,
                        "group":
                        [
                            "Heat",
                            "Cold",
                            "Pain",
                            "Itch",
                            "Pressure"
                        ]
                    },
                    "Equilibrioception",
                    "Olfaction",	
                    "Hearing",	
                    "Proprioception",	
                    "Kinesthesia",	
                    "Time"
                ]
            },
            {
                "name": "Memory",
                "tier": 2,
                "group":
                [
                    "Short Term",	
                    "Medium term",	
                    "Long term",	
                    "Blocked"	
                ]
            },
            {
                "name": "Pattern",
                "tier": 2,
                "group":
                [
                    "Thought",
                    "Behavior",
                    "Belief system",
                    "Identification",
                    "Resistance",
                    "Attachment",
                    "Expectation"
                ]
            },
            {
                "name": "Parts",
                "tier": 2,
                "group":
                [
                    "Certain parts believe they know X",
                    "Many parts"        
                ]
            },
            "Behavior",		
            "Emotions",
            "Psychological Reversals",
            "Ego",		
            "Pain body"		
        ]
    },
    {
        "name": "Actions",
        "tier": 1,
        "group":
        [
            "accept",
            "act",
            "add",
            "analyze",
            "apply",
            "appraise",
            "appreciate",
            "arrange",
            "assemble",
            "assess",
            "boost",
            "build",
            "buy",
            "calculate",
            "call",
            "categorize",
            "choose",
            "cite",
            "claim",
            "classify",
            "collect",
            "combine",
            "compare",
            "compose",
            "confirm",
            "connect",
            "construct",
            "contact",
            "create",
            "criticize",
            "dance",
            "debate",
            "defend",
            "define",
            "demonstrate",
            "depict",
            "describe",
            "design",
            "diagram",
            "differentiate",
            "discover",
            "discuss",
            "distinguish",
            "download",
            "dramatize",
            "employ",
            "enjoy",
            "estimate",
            "evaluate",
            "examine",
            "experiment",
            "explain",
            "explore",
            "express",
            "fast",
            "find",
            "follow",
            "formulate",
            "generalize",
            "get",
            "go",
            "grab",
            "identify",
            "illustrate",
            "improve",
            "increase",
            "inform",
            "inspect",
            "integrate",
            "interpret",
            "judge",
            "justify",
            "keep",
            "kickstart",
            "label",
            "learn",
            "like",
            "list",
            "listen",
            "locate",
            "love",
            "make",
            "manage",
            "master",
            "match",
            "measure",
            "name",
            "operate",
            "optimize",
            "organize",
            "pack",
            "perfect",
            "plan",
            "polish",
            "practice",
            "pray",
            "prepare",
            "propose",
            "protect",
            "question",
            "quote",
            "rate",
            "read",
            "recall",
            "receive",
            "recognize",
            "record",
            "recreate",
            "reduce",
            "register",
            "relate",
            "reply",
            "report",
            "reproduce",
            "restate",
            "review",
            "revise",
            "satisfy",
            "save",
            "schedule",
            "score",
            "see",
            "select",
            "send",
            "share",
            "shop",
            "sign",
            "sign up",
            "simplify",
            "sing",
            "sketch",
            "solve",
            "start",
            "state",
            "supervise",
            "synthesize",
            "take",
            "talk",
            "test",
            "thank",
            "translate",
            "try",
            "tweet",
            "underline",
            "update",
            "use",
            "value",
            "view",
            "visit",
            "watch"        
        ]
    },
    {
        "name": "Location",
        "tier": 1,
        "group":
        [
            {
                "name": "Outdoors",
                "tier": 2,
                "group":
                    [
                        "Desert",
                        "Forest",
                        "Hill",
                        "Mountain",
                        "Tundra",
                        "Oasis",
                        "Canyon",
                        "Glacier",
                        "Cosmos",
                        "Singularity",
                        "Bog",
                        "Swamp",
                        "Marsh",
                        "Pond",
                        "Lake",
                        "Ocean",
                        "Stream",
                        "Brook",
                        "River"                      
                    ]
            },
            {
                "name": "Terrain",
                "tier": 2,
                "group":
                [
                    "Steep",
                    "Rugged",
                    "Rocky",
                    "Unstable",
                    "Rolling",
                    "Flat",
                    "Vertical",
                    "Altitude",
                    "Depth",
                    "Nonspecified"                    
                ]
            },
            {
                "name": "Weather",
                "tier": 2,
                "group":
                [
                    "Clear",
                    "Rain",
                    "Snow",
                    "Freezing",
                    "Hot",
                    "Windy",
                    "Earthquake",
                    "Flood"                    
                ]
            },
            {
                "name": "Civilization",
                "tier": 2,
                "group":
                [
                    "Nation",
                    "State",
                    "Province",
                    "City",
                    "Town",
                    "Street",
                    "Building",
                    "Open space"                        
                ]                        
            },
            {
                "name": "Building",
                "tier": 2,
                "group":
                [
                    "Commercial",
                    "Private",
                    "Business",
                    "Store",
                    "Organization",
                    "Sleeping",
                    "Restaurant",
                    "Grocery",
                    "Home"                    
                ]
            },
            {
                "name": "Indoors",
                "tier": 2,
                "group":
                [
                    "Floor",
                    "Room",
                    "Furniture",
                    "Window",
                    "Ceiling",
                    "Door",
                    "Wall"                    
                ]
            },
            {
                "name": "Spiritual",
                "wrap": false,
                "tier": 2
            }
        ]
    },
    {
        "name": "Individuals",
        "tier": 1,
        "group":
        [
            "Sibling",
            "Parent",
            "Cousin",
            "Parent's Sibling",
            "Grandparent",
            "Extended",
            "Child",
            "Pet",
            "Intermarital",
            "Partner",
            "Best friend",
            "Close friend",
            "Friend",
            "Acquaintence",
            "Coworker",
            "Client",
            "Bystander",
            "Teacher",
            "Student",
            "Classmate",
            "Enemy",
            "Competitor"
        ]
    },
    {
        "name": "Items",
        "tier": 1,
        "group":
        [
            {
                "name": "Containers",
                "tier": 2,
                "group":
                [
                    "Food storage",
                    "Cooking",
                    "Recycling",
                    "Electronic data",
                    "Waste",
                    "Fuel",
                    "Miscellaneous"        
                ]
            },
            {
                "name": "Vehicles",
                "tier": 2,
                "group":
                [
                    "Car",
                    "Train",
                    "Pedal cycle",
                    "Amphibious",
                    "Boat",
                    "Submarine",
                    "Plane"  
                ]
            },
            {
                "name": "Therapy",
                "tier": 2,
                "group":
                [
                    "Physical",
                    "Talk",
                    "Social",
                    "Energy",
                    "Medicine",
                    "Surgery"                                
                ]
            },
            {
                "name": "Communication",
                "tier": 2,
                "group":
                [
                    "Letter",
                    "Social media",
                    "Kinesiology",
                    "Phone",
                    "Videoconference",
                    "Cellular text",
                    "PM app",
                    "Email",
                    "In person",
                    "Telepathy"                                
                ]
            },
            {
                "name": "Creations",
                "tier": 2,
                "group":
                [
                    "Social",
                    "Health",
                    "Sport",
                    "Music",
                    "Clothing",
                    "Literature",
                    "Craft",
                    "Art",
                    "Dance",
                    "Other"                                
                ]
            }
        ]
    },
    {
        "name": "Item Characteristics",
        "tier": 1,
        "group":
        [
            {
                "name": "Amounts",
                "tier": 2,
                "group":
                [
                    "Single",
                    "Multiple",
                    "Each",
                    "Group",
                    "0-1",
                    "1-10",
                    "10-100",
                    "Hundreds",
                    "Thousands",
                    "Millions",
                    "Billions",
                    "Trillions",
                    "Quadrillions",
                    "Pentillions",
                    "Sextillions",
                    "Septillions",
                    "Octillions",
                    "Nonillions",
                    "X-illions",
                    "Small Range",
                    "Large Range",
                    "Number (in range)",
                    "All"
                ]
            },
            {
                "name": "Possessed",
                "tier": 2,
                "group":
                [
                    "Owned",
                    "Newly acquired",
                    "Consider",
                    "Acquire",
                    "Sell",
                    "Donate",
                    "Give away"
                ]
            },
            {
                "name": "Condition",
                "tier": 2,
                "group":
                [
                    "New",
                    "Modern",
                    "Fresh",
                    "Used",
                    "Old",
                    "Antiquated",
                    "Battered",
                    "Destroyed"
                ]
            },
            {
                "name": "Size",
                "tier": 2,
                "group":
                [
                    "Tiny",
                    "Small",
                    "Medium",
                    "Large",
                    "Huge",
                    "Gigantic"
                ]
            },
            {
                "name": "Construction",
                "tier": 2,
                "group":
                [
                    "Electronic",
                    "Electric",
                    "Mechanical",
                    "Simple",
                    "Complicated"
                ]
            },
            {
                "name": "Intended Use",
                "tier": 2,
                "group":
                [
                    "Material working",
                    "For the body",
                    "For the home",
                    "Entertainment",
                    "Educational",
                    "Informational",
                    "Weapon"
                ]
            },
            {
                "name": "Materials",
                "tier": 2,
                "group":
                [
                    "Hide",
                    "Fabric",
                    "Plastic",
                    "Metal",
                    "Wood",
                    "Stone"
                ]
            },
            {
                "name": "Qualities",
                "tier": 2,
                "group":
                [
                    "Soft",
                    "Hard",
                    "Thin",
                    "Thick",
                    "Inexpensive",
                    "Expensive",
                    "Malleable",
                    "Cheap",
                    "Durable"
                ]
            }
        ]
    },
	{
        "name": "Bodies",
        "tier": 1,
        "wrap": false,
        "group":
        [
            {
                "name": "Ego Body",
                "wrap": false,
                "tier": 2
            },
            {
                "name": "Pain Body",
                "wrap": false,
                "tier": 2
            },
            {
                "name": "Physical Body",			
                "tier": 2,
                "group": 
                [
                    {
                        "name": "Skeletal System",
                        "tier": 3,
                        "group":
                        [
                            "bones",	
                            "cartilage",	
                            "ligaments",	
                            "tendons"
                        ]
                    },
                    {
                        "name": "Integumentary System",		
                        "tier": 3,
                        "group": 
                        [
                            "skin",	
                            "hair",	
                            "fat",	
                            "nails"
                        ]
                    },
                    {
                        "name": "Circulatory System",
                        "tier": 3,
                        "group":
                        [		
                            "capillaries",	
                            "vessels",	
                            "arteries"
                        ]
                    },
                    {	
                        "name": "Lymph System",
                        "tier": 3,
                        "group":
                        [	
                            "lymph fluid",	
                            "lymph nodes",	
                            "lymph vessels"
                        ]
                    },
                    {	
                        "name": "Muscular System",		
                        "tier": 3,
                        "group":
                        [
                            "skeletal muscles",	
                            "smooth muscles",	
                            "heart"
                        ]
                    },
                    {
                        "name": "Nervous System",		
                        "tier": 3,
                        "group":
                        [
                            "brain",	
                            "spinal cord",	
                            "peripheral nervous system"
                        ]
                    },
                    {	
                        "name": "Respiratory System",		
                        "tier": 3,
                        "group":
                        [
                            "larynx",	
                            "bronchi",	
                            "lungs",	
                            "diaphragm"
                        ]
                    },
                    {	
                        "name": "Urinary System",
                        "tier": 3,
                        "group":
                        [		
                            "kidneys",	
                            "ureters",	
                            "bladder",	
                            "urethra"
                        ]
                    },
                    {	
                        "name": "Digestive System",		
                        "tier": 3,
                        "group":
                        [	
                            "esophagus",	
                            "stomach",	
                            "liver",	
                            "gallbladder",	
                            "pancreas"
                        ]
                    },
                    {	
                        "name": "gastrointestinal tract",		
                        "tier": 3,
                        "group":
                        [
                            "intestines",	
                            "rectum",	
                            "anus"
                        ]
                    },
                    {	
                        "name": "Reproductive System",		
                        "tier": 3,
                        "group":
                        [
                            {
                                "name": "Male Reproductive System",	
                                "tier": 4,
                                "group":
                                [
                                    "testes",
                                    "vas deferens",
                                    "seminal vessicles",
                                    "prostate"
                                ]
                            },
                            {
                                "name": "Female Reproductive System",	
                                "tier": 4,
                                "group":
                                [
                                    "fallopian tubes",
                                    "uterus",
                                    "vagina",
                                    "mammary glands"
                                ]
                            }
                        ]
                    },
                    {
                        "name": "Endocrine System",		
                        "tier": 3,
                        "group":
                        [
                            "pancreas",	
                            "ovaries",	
                            "testes",	
                            "hypothalamus",	
                            "gastrointestinal tract",	
                            {
                                "name": "Endocrine Glands",	
                                "tier": 4,
                                "group":
                                [
                                    "pineal",
                                    "pituitary",
                                    "thyroid",
                                    "parathyroid",
                                    "adrenals"
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                "name": "Energy Body",
                "tier": 2,
                "group":
                [
                    {
                        "name": "Chakra",
                        "tier": 3,
                        "group":
                        [
                            "Root",
                            "Sacral",
                            "Solar Plexus",
                            "Heart",
                            "Throat",
                            "Third Eye",
                            "Crown",
                            "8-105",
                            "Connection",
                            "Samskara"
                        ]
                    },
                    {
                        "name": "Body",
                        "tier": 3,
                        "group":
                        [
                            "Etheric",
                            "Emotional",
                            "Mental",
                            "Astral",
                            "Etheric",
                            "Template",
                            "Celestial",
                            "Causal"
                        ]			
                    },
                    {
                        "name": "Aspect",
                        "tier": 3,
                        "group":
                        [
                            "Lower",
                            "Lower Emotional",
                            "Lower Mental",
                            "Higher Mental",
                            "Higher Physical",
                            "Emotional",
                            "Mental"			
                        ]
                    },
                    {
                        "name": "Organ",
                        "tier": 3,
                        "group":
                        [
                            "Adrenal gland",
                            "Ovaries, Testicles",
                            "Pancreas",
                            "Thymus gland",
                            "Thyroid gland",
                            "Pituitary gland",
                            "Pineal gland"			
                        ]
                    },
                    {
                        "name": "Hara Line",
                        "tier": 3,
                        "group":
                        [
                            "Earth Star",
                            "Tan Tien",
                            "Core Star",
                            "Soul Seat",
                            "Individuation Point",
                            "Soul Star"            
                        ]
                    },
                    {
                        "name": "Aura",
                        "tier": 3,
                        "group":
                        [
                            "UL Quadrant",
                            "UR Quadrant",
                            "LL Quadrant",
                            "LR Quadrant",
                            "Whole"            
                        ]
                    },
                    {
                        "name": "Meridians",
                        "tier": 3,
                        "group":
                        [
                            "bladder",
                            "central",
                            "circulation-sex",
                            "gallbladder",
                            "governing",
                            "heart",
                            "kidney",
                            "large intestine",
                            "liver",
                            "lung",
                            "small intestine",
                            "spleen",
                            "stomach",
                            "triple warmer"
                        ]
                    }
                ]
            },
            {
                "name": "Child Selves",
                "tier": 2,
                "group":
                [
                    "Source Child Self",
                    "Maker Child Self",
                    "Creator One Child Self",
                    "Creator Parent Child Self",
                    "Creator Child Self"                
                ]
            }
        ]
    },
    {
        "name": "Source Creator Chain",
        "tier": 1,
        "group":
        [
            "Source",
            "Maker",
            "Creator One",
            "Creator Parent",
            "Creator"            
        ]
    },
    {
        "name": "Ascended Masters",
        "tier": 1,
        "group":
        [
            {
                "name": "Afra",
                "description": "Patron of Africa"
            },
            {
                "name": "Akshobhya",
                "description": "A Dhyani Buddha"
            },
            {
                "name": "Aloha",
                "description": "Feminine Elohim of the sixth Ray – her twin flame is Peace."
            },
            {
                "name": "Alpha",
                "description": "The highest manifestation of the god energy in the Central Sun, his twin is Omega."
            },
            {
                "name": "Amaryllis",
                "description": "Goddess of Spring."
            },
            {
                "name": "Amaterasu",
                "description": "Japanese goddess of the Sun."
            },
            {
                "name": "Amazonia",
                "description": "The feminine Elohim of the first ray."
            },
            {
                "name": "Amen Bey",
                "description": "A fourth ray Master. He works closely with Ptah and Archangel Michael. He is a protector."
            },
            {
                "name": "Amerissis",
                "description": "Goddess of Light."
            },
            {
                "name": "Amethyst",
                "description": "The Archeia of the 7th Ray, also known as Holy Amethyst."
            },
            {
                "name": "Amitabha",
                "description": "A Dhyani Buddha."
            },
            {
                "name": "Amoghasigghi",
                "description": "A Dhyani Buddha."
            },
            {
                "name": "Amora",
                "description": "The feminine Elohim of the third Ray."
            },
            {
                "name": "Anubis",
                "description": "Egyptian god of the underworld."
            },
            {
                "name": "Apollo",
                "description": "Elohim of the 2nd ray and twin flame of Lumina, they are guardians of the Cosmic Christ Consciousness."
            },
            {
                "name": "Arcturus",
                "description": "Elohim of the seventh ray along with his twin flame Victoria."
            },
            {
                "name": "Ares",
                "description": "A 2nd ray Cosmic Master. A warrior Master."
            },
            {
                "name": "Ariel",
                "description": "Feminine Archangel."
            },
            {
                "name": "Astrea",
                "description": "Feminine Elohim of the fourth Ray."
            },
            {
                "name": "Aurora",
                "description": "Archeia of the sixth Ray with her Twin flame Archangel Uriel."
            },
            {
                "name": "Babaji",
                "description": "Babaji, known to us via Paramahansa Yogananda’s books, is an Un-ascended Master. He chose to stay on earth with a physical body, till all of humanity ascended. This is a service of great value as his presence anchors the Light of the higher planes into the earth."
            },
            {	
                "name": "Bethel",
                "description": "A second ray Master - his heart radiates with love for all."
            },
            {
                "name": "Brahma",
                "description": "Part of the Hindu trinity, of Brahman, Vishnu and Shiva. Brahma is the creator aspect."
            },
            {
                "name": "Casimir Poiseidon",
                "description": "An old Ascended Master from South America."
            },
            {
                "name": "Cassiopea",
                "description": "Elohim of the Central Sun."
            },
            {
                "name": "Celeste",
                "description": "A Devic Angel of the Ascended Hosts."
            },
            {
                "name": "Cha Ara",
                "description": "A Fifth Ray Master."
            },
            {
                "name": "Chamuel",
                "description": "The Archangel of the third ray, he is a manifestation of Divine Love."
            },
            {
                "name": "Chananda",
                "description": "Chief of the Indian council of the Great White Brotherhood. A first ray Master."
            },
            {
                "name": "Charity",
                "description": "The female Archangel of the Third ray."
            },
            {
                "name": "Christine",
                "description": "The female Archangel of the second ray."
            },
            {
                "name": "Confucius",
                "description": "A second ray Master."
            },
            {
                "name": "Cuzco",
                "description": "Emissary of the god Surya."
            },
            {
                "name": "Cyclopea",
                "description": "Masculine Elohim of the 5th ray for truth, healing and knowledge."
            },
            {
                "name": "Deva of Light",
                "description": "A Cosmic Being."
            },
            {
                "name": "Deva of the Central Sun",
                "description": "A Cosmic Being."
            },
            {
                "name": "Deva of the Seventh Ray",
                "description": "A Cosmic Being."
            },
            {
                "name": "Dom Ignacio",
                "description": "Best known as the Ascended Master working with John of God in Brazil. He is a third ray Master."
            },
            {
                "name": "Elijah",
                "description": "The prophet, as mentioned in the Bible. He returned to Earth as John, the Baptist though he was already an Ascended Master."
            },
            {
                "name": "El Morya",
                "description": "Chohan of the first ray."
            },
            {
                "name": "Elohim of the Eighth Ray",
                "description": "Elohim of the eighth Ray."
            },
            {
                "name": "Enoch",
                "description": "Priest of the Sacred Fire."
            },
            {
                "name": "Eriel",
                "description": "A Chinese Ascended Master."
            },
            {
                "name": "Ernon",
                "description": "An Atlantean ruler, the Rai of Suern."
            },
            {
                "name": "Eros",
                "description": "Also known as the god of Love."
            },
            {
                "name": "Faith",
                "description": "Archeia of the first ray, and twin flame of Archangel Michael."
            },
            {
                "name": "Fortuna",
                "description": "The goddess of supply."
            },
            {
                "name": "Freya",
                "description": "Norse goddess of Love, Beauty, War, Magic and Wisdom."
            },
            {
                "name": "Gabriel",
                "description": "Archangel of the fourth ray."
            },
            {
                "name": "Ganesh",
                "description": "A fifth ray Cosmic master and Hindu god."
            },
            {
                "name": "Gautama Buddha",
                "description": "Lord of the World."
            },
            {
                "name": "Harmony",
                "description": "A Cosmic Master."
            },
            {
                "name": "Hathor",
                "description": "An Egyptian Great Mother goddess. A sixth ray Master."
            },
            {
                "name": "Helios",
                "description": "God of the Central Sun."
            },
            {
                "name": "Hera",
                "description": "A second ray Master."
            },
            {
                "name": "Hercules",
                "description": "Elohim of the first ray."
            },
            {
                "name": "Heros",
                "description": "Elohim of the third ray."
            },
            {
                "name": "Hilarion",
                "description": "Chohan of the fifth ray."
            },
            {
                "name": "Hine-nui-te-po",
                "description": "Maori goddess of the underworld."
            },
            {
                "name": "Hope",
                "description": "Archaeia of the fourth ray."
            },
            {
                "name": "Horus",
                "description": "Egyptian god of kingship and the sky."
            },
            {
                "name": "Inanna",
                "description": "Sumerian goddess of love and war (also called Ishtar, Astarte)."
            },
            {
                "name": "Isolt",
                "description": "The goddess of love and passion in relationships (also known as Esyllt, Iseullt, Isolde, Ysolt and Ysonde)."
            },
            {
                "name": "Isis",
                "description": "An Egyptian goddess. A sixth ray Master."
            },
            {
                "name": "Jesus",
                "description": "A second ray Master."
            },
            {
                "name": "John, the Beloved",
                "description": ""
            },
            {
                "name": "Jophiel",
                "description": "Archangel of the second Ray."
            },
            {
                "name": "Kali",
                "description": "A Hindu goddess, the chief of the Mahavidyas, a destroyer of evil forces."
            },
            {
                "name": "Krishna",
                "description": "A Cosmic Master."
            },
            {
                "name": "Kristine",
                "description": "A new Lady Master."
            },
            {
                "name": "Kuthumi",
                "description": "The World Teacher and a master of the second Ray."
            },
            {
                "name": "Kuan Yin",
                "description": "Goddess of Mercy, a third ray Master."
            },
            {
                "name": "Kuan-ti",
                "description": ""
            },
            {
                "name": "Lady Nada",
                "description": "Helps children and those who need inner child healing. She is a sixth ray Master."
            },
            {
                "name": "Lakshmi",
                "description": "Goddess of Prosperity.  She is a sixth ray Cosmic Master."
            },
            {
                "name": "Lao Tze",
                "description": "A Chinese Ascended Master of the Second Ray."
            },
            {
                "name": "Lord Lanto",
                "description": "Chohan of the second Ray."
            },
            {
                "name": "Lord Ling",
                "description": "A Chinese Ascended Master who was previously Moses."
            },
            {
                "name": "Lumina",
                "description": "The Feminine Elohim of the second Ray with her twin flame Apollo."
            },
            {
                "name": "Ma’at",
                "description": "Egyptian goddess of balance. A third ray Master."
            },
            {
                "name": "Maha Chohan",
                "description": "Chohan of all the eighth ray."
            },
            {
                "name": "Mahakala",
                "description": "A Buddhist protector deity."
            },
            {
                "name": "Maitreya",
                "description": "The Cosmic Christ and planetary Buddha."
            },
            {
                "name": "Manjushri",
                "description": "Boddhisattva of Wisdom."
            },
            {
                "name": "Mary Magdalene",
                "description": "A third ray Ascended Master."
            },
            {
                "name": "Melchizedek",
                "description": "An Ascended Master of the first Ray."
            },
            {
                "name": "Mercury",
                "description": "A greek god - also known as the Roman god Hermes."
            },
            {
                "name": "Metatron",
                "description": "A cosmic angel of the first ray."
            },
            {
                "name": "Mother Mary",
                "description": "As the mother of Jesus she was already an Ascended Master having attained her Ascension in a previous life. She is a third ray Master."
            },
            {
                "name": "Michael",
                "description": "Archangel of the first Ray."
            },
            {
                "name": "Milarepa",
                "description": "A Tibetan Ascended Master."
            },
            {
                "name": "Mother Mary",
                "description": "A Master of love and compassion."
            },
            {
                "name": "Ninguerre",
                "description": "One of three Tibetan creator goddesses."
            },
            {
                "name": "Omega",
                "description": "The highest manifestation of the goddess energy in the Central Sun, her twin is Alpha."
            },
            {
                "name": "Omri-Tas",
                "description": "A cosmic Master of the Violet Flame.  A seventh ray Master."
            },
            {
                "name": "Osiris",
                "description": "The Egyptian god of the afterlife. A first ray Master."
            },
            {
                "name": "Pallas Athena",
                "description": "The sixth ray goddess of Truth."
            },
            {
                "name": "Paul, the Venetian",
                "description": "Chohan of the third Ray."
            },
            {
                "name": "Pavarti",
                "description": ""
            },
            {
                "name": "Peace",
                "description": "Masculine Elohim of the sixth ray."
            },
            {
                "name": "Peace",
                "description": "Goddess of Peace."
            },
            {
                "name": "Pele",
                "description": ""
            },
            {
                "name": "Portia",
                "description": "Lady Ascended Master of the sixth Ray for Justice."
            },
            {
                "name": "Poseidon",
                "description": ""
            },
            {
                "name": "Ptah",
                "description": "A fifth ray Master.  A warrior Master."
            },
            {
                "name": "Purity",
                "description": "Masculine Elohim of the fourth Ray."
            },
            {
                "name": "Purity",
                "description": "Goddess of Purity."
            },
            {
                "name": "Quetzacoatl",
                "description": "A sixth ray Master."
            },
            {
                "name": "Ra",
                "description": ""
            },
            {
                "name": "Ra-mun",
                "description": "An ascended Master of the seventh ray and previous Chohan of the seventh Ray (also spelt Ra-mu)."
            },
            {
                "name": "Raphael",
                "description": "Archangel of the fifth Ray."
            },
            {
                "name": "Ratnasambhava",
                "description": "A Dhyani Buddha."
            },
            {
                "name": "Sanam Kumara",
                "description": "A cosmic Master – he is so vast he has to manifest a body for the Ascended Masters to see him."
            },
            {
                "name": "Sanat Kumara",
                "description": "Lord of the World and the Ancient of Days."
            },
            {
                "name": "Sarasvati",
                "description": ""
            },
            {
                "name": "Serapis Bey",
                "description": "Chohan of the fourth Ray."
            },
            {
                "name": "Shiva",
                "description": "A first ray cosmic Master."
            },
            {
                "name": "Sitataptatra",
                "description": "A goddess of the first ray (red apect). She was the Ascended Master teacher of Gautama Buddha."
            },
            {
                "name": "Saint Anthony of Padua",
                "description": ""
            },
            {
                "name": "Saint Germain",
                "description": "Chohan of the seventh ray."
            },
            {
                "name": "Saint John the Baptist",
                "description": "A first ray Master."
            },
            {
                "name": "Susan'oo",
                "description": "Japanese god of summer storms. A fifth ray Master."
            },
            {
                "name": "Tatiana",
                "description": "Goddess of the Faerie kingdom."
            },
            {
                "name": "Thomas Merton",
                "description": "One of the newest Masters. A first ray Master."
            },
            {
                "name": "Tsukuyomi",
                "description": "A second ray Master and a Japanese god."
            },
            {
                "name": "Uriel",
                "description": "Archangel of the sixth Ray."
            },
            {
                "name": "Uzziel",
                "description": "Archangel of the eighth Ray."
            },
            {
                "name": "Vairochana",
                "description": "A Dhyani Buddha."
            },
            {
                "name": "Vajrakilaya",
                "description": "A Buddhist deity who has attained diamond consciousness."
            },
            {
                "name": "Vesta",
                "description": "Goddess of the home. A third ray Master."
            },
            {
                "name": "Victoria",
                "description": "Feminine Elohim of the seventh Ray."
            },
            {
                "name": "Virginia",
                "description": "Feminine Elohim of the sixth ray for truth, healing and knowledge."
            },
            {
                "name": "Vishnu",
                "description": ""
            },
            {
                "name": "Vwymus",
                "description": "A fifth ray Master."
            },
            {
                "name": "Yemayah",
                "description": "A fourth ray Master, a representative of the Divine Mother."
            },
            {
                "name": "Yogananda",
                "description": "Paramahansa Yogananda"
            },
            {
                "name": "White Tara",
                "description": "Goddess of Compassion and an eighth ray Master."
            },
            {
                "name": "Zadkiel",
                "description": "Archangel of the seventh Ray."
            },
            {
                "name": "Zaruthustra",
                "description": "An eighth ray Master."
            },
            {
                "name": "Zeus",
                "description": ""
            }
        ]
    },
    {
        "name": "Archetypes",
        "tier": 1,
        "group":			
	    [
            {
                "name": "Addict",
                "tier": 2,
                "group":
                [
                    "Conspicuous Consumer",
                    "Glutton",
                    "Workaholic"
                ],
                "see also":	"Gambler"
            },			
            {
                "name": "Advocate",
                "tier": 2,
                "group":
                [
                    "Attorney",
                    "Defender",
                    "Legislator",
                    "Lobbyist",
                    "Environmentalist"
                ]
            },			
            {
                "name": "Alchemist",
                "tier": 2,
                "group":
                [
                    "Wizard",
                    "Magician",
                    "Scientist",
                    "Inventor"
                ],
                "see also":	"Visionary"
            },			
            {
                "name": "Angel",
                "tier": 2,
                "group":
                [
                    "Fairy Godmother",
                    "Fairy Godfather"
                ]
            },			
            {
                "name": "Artist",
                "tier": 2,
                "group":
                [
                    "Artisan",
                    "Craftsperson",
                    "Sculptor",
                    "Weaver"
                ]
            },			
            {
                "name": "Athlete",
                "tier": 2,
                "group":
                [
                    "Olympian"
                ]
            },			
            {
                "name": "Avenger",
                "tier": 2,
                "group":
                [
                    "Avenging Angel",
                    "Savior",
                    "Messiah"
                ]
            },			
            {
                "name": "Beggar",
                "tier": 2,
                "group":
                [
                    "Homeless person",
                    "Indigent"
                ]
            },			
            {
                "name": "Bully",
                "tier": 2,
                "group":
                [
                    "Coward"
                ]
            },			
            {
                "name": "Child",
                "tier": 2,
                "group":
                [
                    "Divine Child",
                    "Magical Child",
                    "Innocent Child",
                    "Nature Child",
                    "Orphan",
                    "Puer Eternis (Eternal Boy)",
                    "Puella Eternis (Eternal Girl)",
                    "Wounded Child"
                ]
            },			
            {
                "name": "Clown",
                "tier": 2,
                "group":
                [
                    "Court Jester",
                    "Fool",
                    "Dummling"
                ]
            },			
            {
                "name": "Companion",
                "tier": 2,
                "group":
                [
                    "Friend",
                    "Sidekick",
                    "Right Arm",
                    "Consort"
                ]
            },			
            {
                "name": "Damsel",
                "tier": 2,
                "group":
                [
                    "Princess"
                ]
            },			
            {
                "name": "Destroyer",
                "tier": 2,
                "group":
                [
                    "Attila",
                    "Mad Scientist",
                    "Serial Killer",
                    "Spoiler"
                ]
            },			
            {
                "name": "Dilettante",
                "tier": 2,
                "group":
                [
                    "Amateur"
                ]
            },			
            {
                "name": "Don Juan",
                "tier": 2,
                "group":
                [
                    "Casanova",
                    "Gigolo",
                    "Seducer",
                    "Sex Addict"
                ]
            },			
            {
                "name": "Engineer",
                "tier": 2,
                "group":
                [
                    "Architect",
                    "Builder",
                    "Schemer"
                ]
            },			
            {
                "name": "Exorcist",
                "tier": 2,
                "group":
                [
                    "Shaman"
                ]
            },			
            {
                "name": "Father",
                "tier": 2,
                "group":
                [
                    "Patriarch",
                    "Progenitor"
                ]
            },			
            {
                "name": "Femme Fatale",
                "tier": 2,
                "group":
                [
                    "Black Widow",
                    "Flirt",
                    "Siren",
                    "Circe",
                    "Seductress",
                    "Enchantress"
                ]
            },			
            {
                "name": "Gambler",
                "wrap": false,
                "tier": 2,
            },			
            {
                "name": "God",
                "tier": 2,
                "group":
                [
                    "Adonis"
                ],
                "see also":	"Hero"
            },			
            {
                "name": "Goddess",
                "wrap": false,
                "tier": 2,
                "see also":	"Heroine"
            },			
            {
                "name": "Gossip",
                "tier": 2,
                "wrap": false,
                "see also":	"Networker"
            },			
            {
                "name": "Guide",
                "tier": 2,
                "group":
                [
                    "Guru",
                    "Sage",
                    "Crone",
                    "Wise Woman",
                    "Spiritual Master",
                    "Evangelist",
                    "Preacher"
                ]
            },			
            {
                "name": "Healer",
                "tier": 2,
                "group":
                [
                    "Wounded Healer",
                    "Intuitive Healer",
                    "Caregiver",
                    "Nurse",
                    "Therapist",
                    "Analyst",
                    "Counselor"
                ]
            },			
            {
                "name": "Hedonist",
                "tier": 2,
                "group":
                [
                    "Bon Vivant",
                    "Chef",
                    "Gourmet",
                    "Gourmand",
                    "Sybarite"
                ],
                "see also":	"Mystic"
            },			
            {
                "name": "Hero",
                "tier": 2,
                "wrap": false,
                "see also":
                [
                    "Knight",
                    "Warrior"
                ]
            },			
            {
                "name": "Heroine",
                "tier": 2,
                "wrap": false,
                "see also":
                [
                    "Knight",
                    "Warrior"
                ]
            },			
            {
                "name": "Judge",
                "tier": 2,
                "group":
                [
                    "Critic",
                    "Examiner",
                    "Mediator",
                    "Arbitrator"
                ]
            },			
            {
                "name": "King",
                "tier": 2,
                "group":
                [
                    "Emperor",
                    "Ruler",
                    "Leader",
                    "Chief"
                ]
            },			
            {
                "name": "Knight",
                "tier": 2,
                "wrap": false,
                "see also":	
                [
                    "Hero",
                    "Heroine",
                    "Warrior",
                    "Rescuer"
                ]
            },			
            {
                "name": "Liberator",
                "wrap": false,
                "tier": 2
            },			
            {
                "name": "Lover",
                "wrap": false,
                "tier": 2
            },			
            {
                "name": "Martyr",
                "wrap": false,
                "tier": 2
            },			
            {
                "name": "Mediator",
                "tier": 2,
                "group":
                [
                    "Ambassador",
                    "Diplomat",
                    "Go Between"
                ]
            },			
            {
                "name": "Mentor",
                "tier": 2,
                "group":
                [
                    "Master",
                    "Counselor",
                    "Tutor"
                ]
            },			
            {
                "name": "Messiah",
                "tier": 2,
                "group":
                [
                    "Redeemer",
                    "Savior"
                ]
            },			
            {
                "name": "Midas",
                "wrap": false,
                "tier": 2
            },			
            {
                "name": "Miser",
                "wrap": false,
                "tier": 2
            },			
            {
                "name": "Monk",
                "tier": 2,
                "group":
                [
                    "Celibate"
                ]
            },			
            {
                "name": "Nun",
                "tier": 2,
                "group":
                [
                    "Celibate"
                ]
            },			
            {
                "name": "Mother",
                "tier": 2,
                "group":
                [
                    "Matriarch",
                    "Mother Nature"
                ]
            },			
            {
                "name": "Mystic",
                "tier": 2,
                "group":
                [
                    "Renunciate",
                    "Anchorite",
                    "Hermit"
                ]
            },			
            {
                "name": "Networker",
                "tier": 2,
                "group":
                [
                    "Messenger",
                    "Herald",
                    "Courier",
                    "Journalist",
                    "Communicator"
                ]
            },			
            {
                "name": "Pioneer",
                "tier": 2,
                "group":
                [
                    "Explorer",
                    "Settler",
                    "Pilgrim",
                    "Innovator"
                ]
            },			
            {
                "name": "Poet",
                "wrap": false,
                "tier": 2
            },			
            {
                "name": "Priest",
                "tier": 2,
                "group":
                [
                    "Priestess",
                    "Minister",
                    "Rabbi",
                    "Evangelist"
                ]
            },			
            {
                "name": "Prince",
                "wrap": false,
                "tier": 2
            },			
            {
                "name": "Prostitute",
                "wrap": false,
                "tier": 2
            },			
            {
                "name": "Queen",
                "tier": 2,
                "group":
                [
                    "Empress"
                ]
            },			
            {
                "name": "Rebel",
                "tier": 2,
                "group":
                [
                    "Anarchist",
                    "Revolutionary",
                    "Political Protester",
                    "Nonconformist",
                    "Pirate"
                ]
            },			
            {
                "name": "Rescuer",
                "wrap": false,
                "tier": 2
            },			
            {
                "name": "Saboteur",
                "wrap": false,
                "tier": 2
            },			
            {
                "name": "Samaritan",
                "wrap": false,
                "tier": 2
            },			
            {
                "name": "Scribe",
                "tier": 2,
                "group":
                [
                    "Copyist",
                    "Secretary",
                    "Accountant"
                ],
                "see also":	"Journalist"
            },			
            {
                "name": "Seeker",
                "tier": 2,
                "group":
                [
                    "Wanderer",
                    "Vagabond",
                    "Nomad"
                ]
            },			
            {
                "name": "Servant",
                "tier": 2,
                "group":
                [
                    "Indentured Servant"
                ]
            },			
            {
                "name": "Shape shifter",
                "tier": 2,
                "group":
                [
                    "Spell caster"
                ],
                "see also":	"Trickster"
            },			
            {
                "name": "Slave",
                "wrap": false,
                "tier": 2
            },			
            {
                "name": "Storyteller",
                "tier": 2,
                "group":
                [
                    "Minstrel",
                    "Narrator"
                ]
            },			
            {
                "name": "Student",
                "tier": 2,
                "group":
                [
                    "Disciple",
                    "Devotee",
                    "Follower",
                    "Apprentice"
                ]
            },			
            {
                "name": "Teacher",
                "tier": 2,
                "group":
                [
                    "Instructor"
                ],
                "see also":	"Mentor"
            },			
            {
                "name": "Thief",
                "tier": 2,
                "group":
                [
                    "Swindler",
                    "Con Artist",
                    "Pickpocket",
                    "Burglar",
                    "Robin Hood"
                ]
            },			
            {
                "name": "Trickster",
                "tier": 2,
                "group":
                [
                    "Puck",
                    "Provocateur"
                ]
            },			
            {
                "name": "Vampire",
                "wrap": false,
                "tier": 2
            },			
            {
                "name": "Victim",
                "wrap": false,
                "tier": 2
            },			
            {
                "name": "Virgin",
                "wrap": false,
                "tier": 2,
                "see also":	"Celibate"
            },			
            {
                "name": "Visionary",
                "tier": 2,
                "group":
                [
                    "Dreamer",
                    "Prophet",
                    "Seer"
                ],
                "see also":	
                [
                    "Guide",
                    "Alchemist"
                ]
            },			
            {
                "name": "Warrior",
                "tier": 2,
                "group":
                [
                    "Soldier",
                    "Crime Fighter",
                    "Amazon",
                    "Mercenary",
                    "Soldier of Fortune",
                    "Gunslinger",
                    "Samurai"
                ]
            },			
            {
                "name": "Wounded Healer",
                "wrap": false,
                "tier": 2
            }
        ]
    },			
	{
        "name": "Low Energies",
        "tier": 1,
        "group":
        [
            "Amount of low energies at level in range 1-Max",
            "Amount of low energies in range 1-Max",
            "All low energies in range 1-Max",
            "All low energies",
            "Transmutation",
            "Block discovered entrypoints"        
        ]
    }
];