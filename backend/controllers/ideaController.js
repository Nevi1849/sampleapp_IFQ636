
const Idea = require('../models/Idea');
const createIdea = async (req, res) => {
    const { title, category, problem, solution, targetMarket, fundingTarget } = req.body;
    const { action } = req.body;
    try {
        if (action !=='saveDraft' && action !== 'submit') {
        return res.status(400).json({ message: 'Invalid action'});
        }
        if (action === 'submit') {
            const requiredFields = [title, category, problem, solution, targetMarket];
            if (requiredFields.some(value => typeof value !== 'string' || !value.trim())) {
                return res.status(400).json({ message: 'Required fields are missing'});
            }
            if (!Number.isFinite(fundingTarget) || fundingTarget <= 0) {
                return res.status(400).json({message: 'Funding target must be a positive number'})
            }
        }
        const status = action === 'submit' ? 'Submitted' : 'Draft';
        const idea = new Idea({
            founder: req.user._id,
            title,
            category,
            problem,
            solution,
            targetMarket,
            fundingTarget,
            status
        });
        await idea.save();
        return res.status(201).json(idea);

    } catch(error) {
        console.error('Error creating idea', error);
        return res.status(500).json({message: 'Failed to create idea'});
    }

};

const getIdeas = async (req, res) => {
    try {
        const filter = req.user.role === 'Reviewer'
            ?{ status: { $ne: 'Draft' }}
            : { founder: req.user._id };

        const ideas = await Idea.find(filter);
        return res.status(200).json(ideas);

    } catch (error) {
       console.error('Error retreiving ideas', error);
       return res.status(500).json({ message: 'Failed to retreive ideas' }); 
    }
};

const reviewIdea = async (req, res) => {
    const { id } = req.params;
    const {
        innovationScore,
        feasibilityScore,
        marketPotentialScore,
        reviewerFeedback
    } = req.body;

    try {
    const idea = await Idea.findById(id);
    if (!idea) {
        return res.status(404).json({
            message: 'Idea not found'
        });
    }
    if (idea.status === 'Draft') {
        return res.status(403).json({
            message: 'Draft ideas cannot be reviewed'
        });
    }
    const scores = [
        innovationScore,
        feasibilityScore,
        marketPotentialScore
    ];

    const validScores = scores.every(
        score => Number.isInteger(score) && score >=1 && score <= 5
    );

    if (!validScores) {
        return res.status(400).json({
            message: 'All scores must be whole numbers between 1 and 5'
        });
    }

    if (typeof reviewerFeedback !== 'string') {
        return res.status(400).json({
            message: 'Reviewer feedback must be text'
        })
    }
    idea.innovationScore = innovationScore;
    idea.feasibilityScore = feasibilityScore;
    idea.marketPotentialScore = marketPotentialScore;
    idea.reviewerFeedback = reviewerFeedback;
    await idea.save();
    return res.status(200).json(idea)

    } catch (error) {
        console.error('Error retrieving idea for review', error);
        return res.status(500).json({
            message: 'Failed to retrieve idea for review'
        });
    }
};

const updateIdeaStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = [
        'Under Review',
        'Approved',
        'Revision Needed',
        'Rejected'
    ];

    if (!allowedStatuses.includes(status)) {
        return res.status(400).json({
            message: 'Invalid review status'
        });
    }

    try {
        const idea = await Idea.findById(id);

        if (!idea) {
            return res.status(404).json({
                message: 'Idea not found'
            });
        }

        if (idea.status === 'Draft') {
            return res.status(403).json({
                message: 'Draft ideas cannot have their review status changed'
            });
        }

        idea.status = status;
        await idea.save();

        return res.status(200).json(idea);

    } catch (error) {
        console.error('Error updating idea status:', error);
        return res.status(500).json({
            message: 'Failed to update idea status'
        });
    }
};


module.exports = { createIdea, getIdeas, reviewIdea, updateIdeaStatus };